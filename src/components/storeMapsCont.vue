<script setup lang="ts">
const props = defineProps<{
    data: mapDataType[]
}>();

import { watch, onMounted, defineProps } from 'vue';
import { mapDataType } from '../types/DataType';
import SearchSvg from './icon/SearchSvg.vue';
import changeTime from '../util/changeTime';

let isOnReady = false;

onMounted(() => {
});

// 데이터 변화를 감시
watch(() => props.data, (newVal) => {
    if (newVal.length > 0) {
        isOnReady = true;
    }
}, { deep: true }); // deep 옵션 활성화


let isOnOpen = false;

function isOnOpenFn(openHour, closeHour) {
    const nowHour = new Date().getHours();
    const nowMinute = new Date().getMinutes();
    const nowTime = Number(nowHour * 100 + nowMinute);

    if (openHour < nowTime && closeHour > nowTime) {
        isOnOpen = true;
        return '영업중'
    } else {
        isOnOpen = false;
        return '영업종료'
    }
}

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
                    <button>민트초코 라떼</button>
                    <button>민트초코 빙수</button>
                </div>
            </div>
        </header>
        <section class="storeMapsList" v-if="isOnReady === true">
            <div :class="'storeMap storeNum' + item.id" v-for="item in props.data" :key="item.id">
                <h3>{{ item.storeName }}</h3>
                <p>🌎 {{ item.address }}</p>
                <div class="isOpenHours">
                    <p>🛫 {{ changeTime(item.openHour) }} ~ {{ changeTime(item.closeHour) }}</p>
                    <span :class="String(isOnOpen)">{{ isOnOpenFn(item.openHour, item.closeHour) }}</span>
                </div>
                <p>📞 {{ item.tel }}</p>
            </div>
        </section>
        <section class="storeMapsList" v-else="isOnReady === true">
            로딩중
        </section>
    </article>
</template>
