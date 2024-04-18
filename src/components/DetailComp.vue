<script setup lang="ts">
import { useRoute } from 'vue-router';
import { mapDataType } from '../types/DataType';
import { useStore } from 'vuex';
import { onUpdated, onMounted, computed, ref } from 'vue';
import dayjs from 'dayjs'
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const store = useStore();
const route = useRoute();
const detailData = ref<mapDataType | null>(null);
const averageRate = ref<Number>(0);
let openTime = ref();
let closeTime = ref();
let reviewValue = ref<String>('');
let userStarGrade = ref<Number>(0);

onUpdated(() => {
    console.log(userStarGrade.value)
    console.log(reviewValue.value)
})

onMounted(async () => {
    await store.getters.getData;
    const data = computed(() => store.state.data as mapDataType[]);
    const filteredData = await data.value.find(item => item.id === Number(route.params.id));
    if (filteredData) {
        detailData.value = filteredData;
        store.commit('setStoreName', filteredData.storeName)
        setAverageRate();
        openTime.value = timeCalculate(filteredData.openHour);
        closeTime.value = timeCalculate(filteredData.closeHour);

    } else {
        window.alert('잘못된 접근입니다.')
    }

    const token = sessionStorage.getItem('jwtToken');
    if (token) {
        const decodedToken = jwtDecode(token);
        store.commit('setLoginData', decodedToken);
        store.commit('setOnToken', true);
    }

    //console.log('디테일의 데이터 ', store.state.loginData.data)
    //console.log('디테일의 토큰 ', store.state.isOnToken)
});

const timeCalculate = (t: number) => {
    const timeString = String(t).padStart(4, '0');
    const formattedTime = `${timeString.slice(0, 2)}:${timeString.slice(2, 4)}`;
    return dayjs().format(`${formattedTime}`);
}

const setAverageRate = () => {
    averageRate.value = 3.3;
}

const onReviewSubmit = async () => {
    event?.preventDefault();

    if (!store.state.isOnToken) {
        window.alert('로그인 후 이용해주세요!');
        reviewValue.value = '';
        userStarGrade.value = 0;
        return;
    }

    const submitData = {
        "postId": detailData.value && detailData.value.id,
        "email": store.state.loginData.data.email,
        "date": dayjs().locale('ko').format('YYYY-MM-DD'),
        "review": reviewValue.value,
        "rate": userStarGrade.value,
        "nickname": store.state.loginData.data.nickname,
        "profile_image": store.state.loginData.data.profile_image,
    }

    await axios.post(`${import.meta.env.VITE_DB_URL}/review`, submitData).then(() => { }).catch((err) => { console.log(err) })

    console.log(submitData)

    reviewValue.value = '';
    userStarGrade.value = 0;
}

</script>

<template>
    <section v-if="detailData" id="DetailPageSection">
        <!-- <DetailHeader :storeName="detailData.storeName as string" /> -->
        <section class="storeDetailInfo">
            <div class="infoContainer">
                <h2 class="storeName">{{ detailData.storeName }}</h2>
                <div class="rateAndReviews">
                    <p class="grade"
                        :style="{ background: `linear-gradient(to right, #00E9B1, #00E9B1 ${averageRate as number * 20}%, #ddd ${averageRate as number * 20 + 1}%)`, backgroundClip: 'text', color: 'transparent' }">
                        ★★★★★</p>
                    <span>{{ averageRate }}</span>
                    <p>| 리뷰 <span class="num">0</span>건</p>
                </div>
                <p>{{ detailData.address }}</p>
                <p>📞 {{ detailData.tel }}</p>
                <p>🔔 {{ openTime }} ~ {{ closeTime }}</p>
            </div>
        </section>
        <section class="storeDetailReview">
        </section>
        <section class="reviewWriteSection">
            <div class="star-container">
                <span class="draw" ref="starRef"
                    :style="{ background: `linear-gradient(to right, #00E9B1, #00E9B1 ${userStarGrade as number * 20}%, #ddd ${userStarGrade as number * 20 + 1}%)`, backgroundClip: 'text', color: 'transparent' }">★★★★★</span>
                <input v-model="userStarGrade" type="range" step="0.5" min="0" max="5">

            </div>
            <form @submit="onReviewSubmit">
                <input type="text" placeholder="솔직한 후기를 적어주세요!" v-model="reviewValue" />
                <button v-bind:disabled="reviewValue?.length as number === 0">전송</button>
            </form>
        </section>
    </section>
</template>
