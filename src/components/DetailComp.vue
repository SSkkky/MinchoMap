<script setup lang="ts">
import { useRoute } from 'vue-router';
import { mapDataType } from '../types/DataType';
import { useStore } from 'vuex';
import { onMounted, computed, ref } from 'vue';
import dayjs from 'dayjs'
import { jwtDecode } from 'jwt-decode';

const store = useStore();
const route = useRoute();
const detailData = ref<mapDataType | null>(null);
const averageRate = ref<Number>(0);
let openTime = ref();
let closeTime = ref();

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

</script>

<template>
    <section v-if="detailData" id="DetailPageSection">
        <!-- <DetailHeader :storeName="detailData.storeName as string" /> -->
        <section class="storeDetailInfo">
            <div class="infoContainer">
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
            <section>
                리뷰가 적용될 공간
            </section>

            <section class="reviewWriteSection">
                <div class="isOnTokenCont" v-if="store.state.isOnToken">
                    <img :src="store.state.loginData.data.profile_image" alt="" v-if="store.state.isOnToken">
                    <p><span class="nickname">{{ store.state.loginData.data.nickname }}</span> 님</p>
                </div>

                <div v-else="store.state.isOnToken">
                    <img src="../assets/images/fn/null.png" alt="">
                    <p><span class="nickname">비회원 님</span></p>
                </div>

                <form>
                    <textarea type="text"></textarea>

                    <button>입력</button>
                </form>
            </section>
        </section>
    </section>
</template>
