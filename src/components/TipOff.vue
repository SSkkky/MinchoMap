<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { jwtDecode } from 'jwt-decode';
import BackSvg from './icon/BackSvg.vue'

const router = useRouter();
const store = useStore();
const onIsSearch = ref(false);
const keyword = ref('');
const resultPlaces = ref();
const isOnSelect = ref(false);
const resultPlacesItem = ref();
const stepNum = ref(1);
let ps;

onMounted(() => {
    ps = new kakao.maps.services.Places();

    const token = sessionStorage.getItem('jwtToken');
    if (!token) {
        // window.alert('잘못된 접근입니다.')
    } else {
        const decodedToken = jwtDecode(token);
        store.commit('setLoginData', decodedToken);
        store.commit('setOnToken', true);
    }
})

const searchPlacesFunction = () => {
    event?.preventDefault();
    searchPlaces()
}

const searchPlaces = () => {
    if (keyword.value.length < 1) {
        alert('키워드를 입력해주세요!');
        return false;
    }

    ps.keywordSearch(keyword.value, placesSearchCB);
    keyword.value = '';
}

const placesSearchCB = (places, status) => {
    if (status === kakao.maps.services.Status.OK) {
        resultPlaces.value = places;
        onIsSearch.value = true;
        console.log('검색 결과!!!!!!!!!!!!!!!!', places)
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        alert('검색 결과가 존재하지 않습니다.');
        return;
    } else if (status === kakao.maps.services.Status.ERROR) {
        alert('검색 결과 중 오류가 발생했습니다.');
        return;
    }
}

const resultPlacesSelect = (item) => {
    resultPlacesItem.value = item;
    onIsSearch.value = false;
    isOnSelect.value = true;
    console.log('resultPlacesItem.value', resultPlacesItem.value)
}

const onClickDeleteBtn = () => {
    console.log('삭제!')
    resultPlacesItem.value = null;
    isOnSelect.value = false;
}

const clickBtn = (state) => {
    switch (state) {
        case 'cancle':
            router.go(-1);
            break;

        case 'prev' :
            if(stepNum.value === 1){
                router.go(-1)
            } else if(stepNum.value === 2){
                stepNum.value--;
            }
            break;
        
        case 'next' :
            stepNum.value++;
            break;

        default:
            break;
    }
}

</script>

<template>
    <section id="TipOffSection">
        <header class="TipOffNotice responsive">
            <button @click="clickBtn('prev')" class="prevBtn leftBtn"><BackSvg/></button>
            <span class="tipOffTitle">{{ stepNum === 1 ? '1단계 (1/2)' : '2단계 (2/2)'}}</span>
        </header>
        <section class="stepSection step1 responsive" v-if="stepNum === 1">
            <h2>매장 선택</h2>
            <p class="subText">제보할 매장을 선택해주세요!</p>
            <section id="tipOffSearchStore" class="map_wrap">
                <div id="menu_wrap">
                    <div class="option">
                        <form @submit="searchPlacesFunction()">
                            <input type="search" v-model="keyword">
                            <button type="submit">검색</button>
                        </form>
                    </div>

                    <ul id="placesList" v-if="onIsSearch">
                        <li v-for="(item) in resultPlaces" @click="resultPlacesSelect(item)" v-if="onIsSearch">
                            <b class="place_name">{{ item.place_name }}</b>
                            <p class="road_address_name">{{ item.road_address_name }}</p>
                            <p class="address_name">[지번] {{ item.address_name }}</p>
                            <hr>
                        </li>
                    </ul>
                </div>
                <div id="map" :style="{ display: `none` }"></div>
            </section>
            <span class="selectSearchItem" v-if="isOnSelect">
                {{ resultPlacesItem.place_name }}
                <button class="deleteItem" @click="onClickDeleteBtn">✕</button>
            </span>
        </section>
        <section class="stepSection step2 responsive" v-if="stepNum === 2">
            <h3><span class="step">STEP.2</span>민초 메뉴</h3>
            <p class="subText">민트초코 메뉴를 제보해주세요!</p>
            <button class="plus">+</button>
            
        </section>
        <footer id="tipoffFooter" class="responsive">
            <button @click="console.log('데이터전송')" class="nextBtn rightBtn" v-if="stepNum === 2">{{ stepNum === 2 ? '전송' : '다음'}}</button>
            <button @click="clickBtn('next')" class="nextBtn rightBtn" v-else="stepNum === 2">다음</button>
        </footer>
    </section>
</template>
