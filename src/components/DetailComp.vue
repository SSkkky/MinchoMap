<script setup lang="ts">
import { useRoute } from 'vue-router';
import { mapDataType, detailReviewType } from '../types/DataType';
import { useStore } from 'vuex';
import { onMounted, computed, ref } from 'vue';
import dayjs from 'dayjs'
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const store = useStore();
const route = useRoute();
const detailData = ref<mapDataType | null>(null);
const reviewData = ref<detailReviewType[] | null>([]);
const averageRate = ref<Number>(0);
const isOnUpdate = ref(false);
const isOnUpdateData = ref();
let openTime = ref();
let closeTime = ref();
let reviewValue = ref<String>('');
let userStarGrade = ref<Number>(0);
let reviewRateAverageNum = ref<Number>(0);

const getReviewData = async () => {
    const getData = await axios.get(`${import.meta.env.VITE_DB_URL}/review/${detailData.value && detailData.value.id}`)
    reviewData.value = getData.data;
}

onMounted(async () => {
    await store.getters.getData;
    const data = computed(() => store.state.data as mapDataType[]);
    const filteredData = data.value.find(item => item.id === Number(route.params.id));
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

    await getReviewData();
    calAverageRate();
    //console.log(reviewData.value)

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
    let submitData;

    if (!store.state.isOnToken) {
        window.alert('로그인 후 이용해주세요!');
        reviewValue.value = '';
        userStarGrade.value = 0;
        return;
    }

    if(isOnUpdate.value){
        submitData = {
                "postId": isOnUpdateData.value.postId,
                "email": isOnUpdateData.value.email,
                "date": isOnUpdateData.value.date,
                "review": reviewValue.value,
                "rate": userStarGrade.value,
                "nickname": isOnUpdateData.value.nickname,
                "profile_image": isOnUpdateData.value.profile_image
        }

        await axios.put(`${import.meta.env.VITE_DB_URL}/review/${isOnUpdateData.value._id}`, submitData)

    } else{
        if(detailData.value){
            submitData = {
                "postId": detailData.value && detailData.value.id,
                "email": store.state.loginData.data.email,
                "date": dayjs().locale('ko').format('YYYY-MM-DD'),
                "review": reviewValue.value,
                "rate": userStarGrade.value,
                "nickname": store.state.loginData.data.nickname,
                "profile_image": store.state.loginData.data.profile_image
            }
        } else{
            window.alert('잘못된 접근입니다.');
            return;
        }

        await axios.post(`${import.meta.env.VITE_DB_URL}/review`, submitData).then(() => { }).catch((err) => { console.log(err) })
    }

    await getReviewData();
    calAverageRate();

    reviewValue.value = '';
    userStarGrade.value = 0;
    isOnUpdate.value = false;
}

const calAverageRate = () => {
    let j = 0;
    if(reviewData.value && reviewData.value.length === 0){
        reviewRateAverageNum.value = 0;
        return;
    }
    if (reviewData.value) {
      for (let i = 0; i < reviewData.value.length; i++) {
        j += reviewData.value[i].rate;
      }
      reviewRateAverageNum.value = j/reviewData.value.length;
    }
}

const reviewDelete = async (item) => {
    await axios.delete(`${import.meta.env.VITE_DB_URL}/review/${item._id}`)
    await getReviewData();
    calAverageRate();
}

const reviewUpdate = async (item) => {
    reviewValue.value = item.review;
    userStarGrade.value = item.rate;
    isOnUpdate.value = true;
    isOnUpdateData.value = item;
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
                        :style="{ background: `linear-gradient(to right, #00E9B1, #00E9B1 ${reviewRateAverageNum as number * 20}%, #ddd ${reviewRateAverageNum as number * 20 + 1}%)`, backgroundClip: 'text', color: 'transparent' }">
                        ★★★★★</p>
                    <span v-if="reviewRateAverageNum">{{ reviewRateAverageNum }}</span>
                    <span v-else="reviewRateAverageNum">0</span>
                    <p>| 리뷰 <span class="num">{{ reviewData?.length }}</span>건</p>
                </div>
                <p>{{ detailData.address }}</p>
                <p>📞 {{ detailData.tel }}</p>
                <p>🔔 {{ openTime }} ~ {{ closeTime }}</p>
            </div>
        </section>
        <section class="storeDetailReview">
            <article v-for="(item) in reviewData" v-if="reviewData && reviewData.length > 0">
                <img :src="item.profile_image">
                <div class="reviewContentCont">
                    <p class="grade"
                        :style="{ background: `linear-gradient(to right, #00E9B1, #00E9B1 ${item.rate * 20}%, #ddd ${item.rate as number * 20 + 1}%)`, backgroundClip: 'text', color: 'transparent' }">
                        ★★★★★</p>
                    <p class="review">"{{ item.review }}"</p>
                    <div class="nickname_date">
                        <p class="nickname">{{ item.nickname }}</p>
                        <p class="date">{{ item.date }}</p>
                        <button class="update" v-on:click="reviewUpdate(item)" v-if="store.state.isOnToken && store.state.loginData.data.email === item.email">수정</button>
                        <button class="delete" v-on:click="reviewDelete(item)" v-if="store.state.isOnToken && store.state.loginData.data.email === item.email">삭제</button>
                    </div>
                </div>
            </article>
            <p class="null" v-else="reviewData.length > 0">아직 작성된 후기가 없어요!</p>
        </section>
        <section class="reviewWriteSection">
            <div class="star-container">
                <span class="draw" ref="starRef"
                    :style="{ background: `linear-gradient(to right, #00E9B1, ${userStarGrade as number * 20}%, #ddd ${userStarGrade as number * 20 + 1}%)`, backgroundClip: 'text', color: 'transparent' }">★★★★★</span>
                <input v-model="userStarGrade" type="range" step="0.5" min="0" max="5">
            </div>
            <form @submit="onReviewSubmit">
                <input type="text" placeholder="솔직한 후기를 적어주세요!" v-model="reviewValue" />
                <button v-bind:disabled="reviewValue?.length as number === 0">전송</button>
            </form>
        </section>
    </section>
</template>
