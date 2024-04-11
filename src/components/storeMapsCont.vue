<script setup lang="ts">
const props = defineProps<{
    data: mapDataType[]
}>();

import { watch, onMounted, defineProps } from 'vue';
import { mapDataType } from '../types/DataType';
import SearchSvg from './icon/SearchSvg.vue';
import dayjs from "dayjs";
import changeTime from '../util/changeTime';

let isOnReady = false;

onMounted(() => {
});

// 데이터 변화를 감시
watch(() => props.data, (newVal) => {
    if (newVal.length > 0) {
        isOnReady = true;
        console.log(changeTime(830))
        console.log(changeTime(810))
        console.log(changeTime(800))
        console.log(changeTime(1830))
        console.log(changeTime(1801))
        console.log(changeTime(1800))
    }
}, { deep: true }); // deep 옵션 활성화

</script>

<template>
    <article id="storeMapsCont">
        <header class="storeMapsHeader">
            <div class="searchCont">
                <input type="text" name="storeSearch" class="storeSearch" placeholder="메뉴 또는 지역을 검색해주세요!">
                <button type="submit" class="storeSearchBtn">
                    <SearchSvg />
                </button>
            </div>
            <div class="recommendMenuCont">
                <p class="recommendMenuTitle">👍주인장 강력 추천 메뉴👍</p>
                <div class="recommendMenus">
                    <button>민트초코 프라페</button>
                    <button>민트초코 아이스크림</button>
                    <button>민트초코 케이크</button>
                    <button>민트초코 빙수</button>
                </div>
            </div>
        </header>
        <section class="storeMapsList" v-if="isOnReady === true">
            <ul :class="'storeMap storeNum' + item.id" v-for="item in props.data" :key="item.id">
                <li>
                    <h3>{{ item.storeName }}</h3>
                </li>
                <li>🌎 {{ item.address }}</li>
                <li>🛫 {{ dayjs(item.openHour).format("HH:mm") }} ~ {{ dayjs(item.closeHour).format("HH:mm")
                    }} <span>영업중</span></li>

                <li>📞 {{ item.tel }}</li>
            </ul>
        </section>
        <section class="storeMapsList" v-else="isOnReady === true">
            로딩중
        </section>
    </article>
</template>
