<script setup lang="ts">
const props = defineProps<{
    data: mapDataType[],
    map: any,
    isMapReady: boolean;
}>();

import { ref, watch, onMounted, defineProps, onUpdated } from 'vue';
// import { useRouter } from 'vue-router';
import { mapDataType } from '../types/DataType';
import SearchSvg from './icon/SearchSvg.vue';
import changeTime from '../util/changeTime';
// const router = useRouter();

onMounted(() => {

});

onUpdated(() => {
    // console.log(props)
    // console.log(props.map)
})


let isOnReady = ref(false);
let isOnOpen = ref(false);
let copyData;
const searchKeyword = ref('');
const selectBtnTexts = ref(['민트초코 프라페', '민트초코 아이스크림', '민트초코 라떼', '민트초코 빙수']);


// 데이터 변화를 감시
watch(() => props.data, (newVal) => {
    if (newVal.length > 0) {
        isOnReady.value = true;
        copyData = props.data;
    }
}, { deep: true }); // deep 옵션 활성화

watch(() => props.map, (newVal) => {
    if (newVal.length > 0) {
        // console.log('ㅇㅅㅇ??', props.map)
    }
}, { deep: true });

function isOnOpenFn(openHour, closeHour) {
    const nowHour = new Date().getHours();
    const nowMinute = new Date().getMinutes();
    const nowTime = Number(nowHour * 100 + nowMinute);

    if (openHour < nowTime && closeHour > nowTime) {
        isOnOpen.value = true;
        return '영업중'
    } else {
        isOnOpen.value = false;
        return '영업종료'
    }
}


const onSearch = (keyword: string) => {
    if (keyword.length === 0) {
        window.alert('검색어를 입력해주세요')
        return;
    }
    const searchData = props.data.filter((item) => {
        return item.storeName.includes(keyword) ||
            item.address.includes(keyword) ||
            item.menu[0].name.includes(keyword);
    })
    copyData = searchData;
    props.map.setCenter(new kakao.maps.LatLng(searchData[0].coordinate.y, searchData[0].coordinate.x));
    searchKeyword.value = '';
}

function handleSubmit() {
    onSearch(searchKeyword.value);
    searchKeyword.value = '';
}

const clickSelectBtns = (Num: number) => {
    searchKeyword.value = selectBtnTexts.value[Num];
}

const onClickStoreList = (Num: number) => {
    // console.log(Num)
    const [item] = props.data.filter((item) => (item.id === Num))
    props.map.setCenter(new kakao.maps.LatLng(item.coordinate.y, item.coordinate.x));
}

</script>

<template>
    <article id="storeMapsCont">
        <header class="storeMapsHeader">
            <form class="searchCont" @submit.prevent="handleSubmit">
                <div class="searchInputCont">
                    <input type="text" name="storeName" class="storeSearch" placeholder="메뉴 또는 지역을 검색해주세요!"
                        v-model="searchKeyword">
                    <button class="storeSearchBtn">
                        <SearchSvg />
                    </button>
                </div>
                <div class="recommendMenuCont">
                    <p class="recommendMenuTitle">👍주인장 강력 추천 메뉴👍</p>
                    <div class="recommendMenus">
                        <button v-for="(item, index) in selectBtnTexts" v-on:click="clickSelectBtns(index)">{{ item
                            }}</button>
                    </div>
                </div>
            </form>
        </header>
        <section class="storeMapsList" v-if="isOnReady === true">
            <div class="storeMap resultNull" v-if="copyData.length === 0">
                <p>검색결과가 없습니다!ㅠㅠ</p>
                <div>
                    <span>좋은 가게를 알고있다면?</span>
                    <a href="/">▶ 제보하러가기</a>
                </div>
            </div>
            <!--v-on:click="router.push(`/detail/${item.id}`)"-->
            <div :class="'storeMap storeNum' + item.id" v-for="item in copyData" :key="item.id"
                v-on:click="onClickStoreList(item.id)" v-else="copyData.length === 0">
                <h3>{{ item.storeName }}</h3>
                <span class="menu">#{{ item.menu[0].name }} {{ item.menu[0].price }}원</span>
                <p>🌎 {{ item.address }}</p>
                <div class="isOpenHours">
                    <p>🛫 {{ changeTime(item.openHour) }} ~ {{ changeTime(item.closeHour) }}</p>
                    <span :class="String(isOnOpen)">{{ isOnOpenFn(item.openHour, item.closeHour) }}</span>
                </div>
                <p>📞 {{ item.tel }}</p>
            </div>
        </section>
        <section class="storeMapsList" v-else="isOnReady === true">
            <div class="onLoading d-flex justify-content-center">
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        </section>
    </article>
</template>
