<script setup lang="ts">
const props = defineProps<{
    data: mapDataType[],
    map: any,
    isMapReady: boolean;
}>();

import { ref, watch, defineProps, onMounted } from 'vue';
import storeMapsRecommendMenus from './sub/storeMapsRecommendMenus.vue';
import { useStore } from 'vuex';
import { mapDataType } from '../types/DataType';
import {useRouter} from 'vue-router';

const selectBtnTexts = ['민트초코오레오프라페', '민트프라페', '민트초코 라떼', '민트초코 빙수', '민트초코아이스크림', '민트초코쿠키', '민트초코마들렌'];
const store = useStore();
const router = useRouter();
let isOnReady = ref(false);
const searchKeyword = ref('');


const watchProps = () => {
    if (props.data.length > 0) {
        isOnReady.value = true;
        store.commit('setCopyData', props.data)
    }
}

watch(() => props.data, () => {
    watchProps();
}, { deep: true });

onMounted(() => {
    watchProps();
})

const onSearch = (keyword: string) => {
    if (keyword.length === 0) {
        window.alert('검색어를 입력해주세요')
        return;
    }
    const searchData = store.state.data.filter((item) => {
        return item.storeName.includes(keyword) ||
            item.address.includes(keyword) ||
            item.menu[0].name.includes(keyword);
    })

    store.commit('setCopyData', searchData);

    if (searchData.length === 0) {
        return;
    } else {
        props.map.setCenter(new kakao.maps.LatLng(searchData[0].coordinate.y + 0.0005, searchData[0].coordinate.x));
        searchKeyword.value = '';
    }
}

function handleSubmit() {
    onSearch(searchKeyword.value);
    searchKeyword.value = '';
}

const clickSelectBtns = (Num: number) => {
    searchKeyword.value = selectBtnTexts[Num];
}

const onClickStoreList = (item: mapDataType) => {
    if (props.map) {
        props.map.setCenter(new kakao.maps.LatLng(item.coordinate.y + 0.0005, item.coordinate.x));
    }
}

const onClickTipOff = () => {
    if(sessionStorage.getItem('jwtToken')){
        router.push('/tipoff')
    }else{
        window.alert('로그인 후 제보 가능합니다!')
    }
}

</script>

<template>
    <article id="storeMapsCont">
        <header class="storeMapsHeader">
            <form class="searchCont" @submit.prevent="handleSubmit">
                <section class="recommendMenuCont">
                    <b class="recommendMenuTitle">👍주인장 강력 추천 메뉴👍</b>
                    <section class="recommendMenus">
                       <storeMapsRecommendMenus
                       :clickSelectBtns="clickSelectBtns"
                       :selectBtnTexts="selectBtnTexts"/>
                    </section>
                </section>
            </form>
        </header>
        <section class="storeMapsList" v-if="isOnReady === true">
            <div class="storeMap resultNull" v-if="store.state.copyData.length === 0">
                <p>검색결과가 없습니다!ㅠㅠ</p>
                <div>
                    <span>좋은 가게를 알고있다면?   </span>
                    <span class="tipoff" @click="onClickTipOff">▶제보하러가기</span>
                </div>
            </div>
            <!--v-on:click="router.push(`/detail/${item.id}`)"-->
            <div :class="'storeMap storeNum' + item.id" v-for="item in store.state.copyData" :key="item.id"
                v-on:click="onClickStoreList(item)" v-else="store.state.copyData.length === 0">
                <h3>{{ item.storeName }}</h3>
                <span class="menu">#{{ item.menu[0].name }} {{ item.menu[0].price }}원</span>
                <p>🌎 {{ item.address }}</p>
                <!-- <div class="isOpenHours">
                    <p>🛫 {{ changeTime(item.openHour) }} ~ {{ changeTime(item.closeHour) }}</p>
                    <span :class="String(isOnOpen)">{{ isOnOpenFn(item.openHour, item.closeHour) }}</span>
                </div> -->
                <p v-if="item.tel && item.tel.length > 0">📞 {{ item.tel }}</p>
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
