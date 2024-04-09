<script setup lang="ts">
import { useRoute } from 'vue-router';
import { mapDataType } from '../types/DataType';
import { useStore } from 'vuex';
import { onMounted, computed, ref } from 'vue';
import StarRating from './star/StarRating.vue';
import DetailHeader from './detail/DetailHeader.vue';
import dayjs from 'dayjs'

const store = useStore();
const route = useRoute();
const detailData = ref<mapDataType | null>(null);
const averageRate = ref<Number | null>(0);
let openTime = ref();
let closeTime = ref();

onMounted(async () => {
    await store.getters.getData;
    const data = computed(() => store.state.data as mapDataType[]);
    const filteredData = await data.value.find(item => item.id === Number(route.params.id));
    if (filteredData) {
        detailData.value = filteredData;
        setAverageRate();
        openTime.value = timeCalculate(filteredData.openHour);
        closeTime.value = timeCalculate(filteredData.closeHour);

    } else {
        window.alert('잘못된 접근입니다.')
    }
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
        <DetailHeader :storeName="detailData.storeName as string" />
        <section class="storeDetailInfo">
            <div class="infoContainer">
                <div class="rateAndReviews">
                    <StarRating :averageRate="averageRate as number" class="StarRating" />
                    <span>{{ averageRate }}</span>
                    <p>| 리뷰 <span class="num">0</span>건</p>
                </div>
                <p>{{ detailData.address }}</p>
                <p>📞 {{ detailData.tel }}</p>
                <p>🔔 {{ openTime }} ~ {{ closeTime }}</p>
            </div>
        </section>
        <section class="storeDetailReview">
            리뷰가 적용될 공간
        </section>
    </section>
</template>
