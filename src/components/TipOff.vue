<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { jwtDecode } from 'jwt-decode';
import BackSvg from './icon/BackSvg.vue'
import axios from 'axios';

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
}

const onClickDeleteBtn = () => {
    resultPlacesItem.value = null;
    isOnSelect.value = false;
}

const stepNumTitles = ["1단계 (1/2)", "2단계 (2/2)", "최종 확인"];

const clickBtn = (state) => {
    switch (state) {
        case 'prev' :
            if(stepNum.value === 1){
                router.go(-1)
            } else if(stepNum.value !== 1){
                stepNum.value--;
            }
            break;
        
        case 'next' :
            stepNum.value++;
            break;
        
        case 'submit' :
            if(!sessionStorage.getItem('jwtToken')){
                window.alert('로그인 후 이용해주세요.')
                router.push('/')
                return;
            }
            if(!resultPlacesItem.value || !inputs.value){
                window.alert('오류가 발생했습니다. 관리자에게 문의해주세요!')
                return;
            }
            stepNum.value++;
            const data = {
                email : store.state.loginData.data.email,
                nickname : store.state.loginData.data.nickname,
                id : Number(resultPlacesItem.value.id),
                storeName : resultPlacesItem.value.place_name,
                tel : resultPlacesItem.value.phone,
                address : resultPlacesItem.value.road_address_name,
                coordinate : {
                    x : Number(resultPlacesItem.value.x),
                    y : Number(resultPlacesItem.value.y)
                },
                openHour : null,
                closeHour : null,
                menu : inputs.value,
                state : false
            }
            axios.post(`${import.meta.env.VITE_DB_URL}`, data)
            .then(()=>{})
            .catch((err)=>{console.log(err)})

            break;

        default:
            break;
    }
}

 const inputs = ref([{  name: "", price: null }]);

const addInput = () => {
  inputs.value.push({ name: "", price: null });
}

const removeInput = (index) => {
  inputs.value.splice(index, 1);
}

const step2Disable = computed(() => {
  return !inputs.value.every(element => {
    return element.name !== "" && element.price !== null;
  });
});


</script>

<template>
    <section id="TipOffSection">
        <header class="TipOffNotice responsive">
            <button @click="clickBtn('prev')" class="prevBtn leftBtn" v-if="stepNum !== 4"><BackSvg/></button>
            <span class="tipOffTitle">{{stepNumTitles[stepNum - 1]}}</span>
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
            <article class="selectSearchItem" v-if="isOnSelect">
                <button @click="onClickDeleteBtn">✕</button>
                <p>선택한 민초 맛집은</p>
                <p><b>{{ resultPlacesItem.road_address_name }}</b>에 위치한</p>
                <p><b class="place_name">"{{ resultPlacesItem.place_name }}"</b>입니다.</p>
            </article>
        </section>
        <section class="stepSection step2 responsive" v-if="stepNum === 2">
            <h3>민초 메뉴</h3>
            <p class="subText">{{ resultPlacesItem.place_name }}의 민트 초코 메뉴를 알려주세요.</p>
            <section class="step2InputSection">
                <button class="insert" @click="addInput">+</button>
                <article class="insertItems" v-for="(input, index) in inputs" :key="index">
                  <input class="name" v-model="input.name" type="text" placeholder="예) 민초프라페"/>
                  <input class="price" v-model.number="input.price" type="number" placeholder="예) 4000"/>
                  <button class="delete"@click="removeInput(index)">-</button>
                </article>
            </section>
        </section>
        <section class="stepSection step3 responsive" v-if="stepNum === 3">
            <h3>마지막 단계에요</h3>
            <p class="subText">아래 내용으로 제보하는게 맞으신가요?</p>
            <section class="step3Check">
                <article class="selectStore">
                <b class="place_name">{{ resultPlacesItem.place_name }}</b>
                <p> 주소 : {{ resultPlacesItem.road_address_name }}</p>
                <p> 메뉴 : <span class="menuItems"v-for="(item) in inputs">#{{ item.name }}_{{ item.price }}원</span></p>
                </article>
            </section>
        </section>
        <section class="stepSection step4 responsive" v-if="stepNum === 4">
            <p class="title">감사합니다!</p>
            <p>제보해주신 민초 맛집은 검수 후 등록됩니다!</p>
        </section>
        <footer id="tipoffFooter" class="responsive">
            <button @click="clickBtn('next')" :class="resultPlacesItem ? 'rightBtn' : 'disible'" v-if="stepNum === 1" :disabled="!resultPlacesItem">다음</button>
            <button @click="clickBtn('next')" :class="step2Disable ? 'disible' : 'able'" v-if="stepNum === 2" :disabled="step2Disable">다음</button>
            <button @click="clickBtn('submit')" v-if="stepNum === 3">전송</button>
            <button @click="router.push('/')" v-if="stepNum === 4">완료</button>
        </footer>
    </section>
</template>
