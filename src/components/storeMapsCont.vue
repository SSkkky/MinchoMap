<script setup lang="ts">
const props = defineProps<{
    data: mapDataType[],
    map: any,
    isMapReady: boolean;
}>();

import { ref, watch, defineProps, onMounted } from 'vue';
// import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { mapDataType } from '../types/DataType';
// import changeTime from '../util/changeTime';
// const router = useRouter();

const store = useStore();
let isOnReady = ref(false);
// let isOnOpen = ref(false);
const searchKeyword = ref('');
const selectBtnTexts = ['민트초코오레오프라페', '민트프라페', '민트초코 라떼', '민트초코 빙수'];


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

// function isOnOpenFn(openHour, closeHour) {
//     const nowHour = new Date().getHours();
//     const nowMinute = new Date().getMinutes();
//     const nowTime = Number(nowHour * 100 + nowMinute);

//     if (openHour < nowTime && closeHour > nowTime) {
//         isOnOpen.value = true;
//         return '영업중'
//     } else {
//         isOnOpen.value = false;
//         return '영업종료'
//     }
// }


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
    // console.log(props.map)
    if (props.map) {
        // console.log('item ------ ', item)
        props.map.setCenter(new kakao.maps.LatLng(item.coordinate.y + 0.0005, item.coordinate.x));
    }
}

</script>

<template>
    <article id="storeMapsCont">
        <header class="storeMapsHeader">
            <form class="searchCont" @submit.prevent="handleSubmit">
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
            <div class="storeMap resultNull" v-if="store.state.copyData.length === 0">
                <p>검색결과가 없습니다!ㅠㅠ</p>
                <div>
                    <span>좋은 가게를 알고있다면?</span>
                    <a href="/tipoff">▶ 제보하러가기</a>
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
