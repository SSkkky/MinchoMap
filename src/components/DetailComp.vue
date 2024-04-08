<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { mapDataType } from '../types/DataType';
import { useStore } from 'vuex';
import { onMounted, computed, ref } from 'vue';
import BackSvg from  '@/components/icon/BackSvg.vue';
import StarRating from '@/components/star/StarRating.vue'

const store = useStore();
const route = useRoute();
const router = useRouter();
const detailData = ref<mapDataType | null>(null);
const averageRate = ref<Number | null>(0);

onMounted(async () => {
    await store.getters.getData;
    const data = computed(() => store.state.data as mapDataType[]);
    const filteredData = await data.value.find(item => item.id === Number(route.params.id));
    console.log('filteredData', filteredData)
    if(filteredData){
        detailData.value = filteredData;
        setAverageRate();
    } else{
        window.alert('잘못된 접근입니다.')
    }
});

const setAverageRate = () => {
    averageRate.value = 3.3;
}

</script>

<template>
    <section v-if="detailData" id="DetailPageSection">
        <header>
            <button v-on:click="router.go(-1)"><BackSvg /></button>
            <h1>{{ detailData.storeName }}</h1>
            <button>⭐</button>
        </header>
        <section class="storeDetailInfo">
            <div class="infoContainer">
                <div class="rateAndReviews">
                    <p>
                        <StarRating :rate="averageRate"/>
                        <span>{{averageRate}}</span>
                    </p>
                    <p>| 리뷰 0건</p>
                </div>
                <p>{{ detailData.address }}</p>
                <p>{{ detailData.tel }}</p>
            </div>
        </section>
        <section class="storeDetailReview">
            리뷰가 적용될 공간
        </section>
    </section>
</template>
