<script setup lang="ts">
import { mapDataType } from '../types/DataType';
import { useStore } from 'vuex';
import { onMounted, computed, ComputedRef, ref } from 'vue';
import { jwtDecode } from 'jwt-decode';
import { initMap } from '../lib/KakaoMap';
import storeMapsCont from './storeMapsCont.vue';
//import TipOffButton from './sub/TipOffButton.vue';
//import LoginButton from './sub/LoginButton.vue';


const store = useStore();
const data: ComputedRef<mapDataType[]> = computed(() => (store.state.data));

let map = ref();
let isMapReady = false;

async function fetchData() {
    await store.getters.getData;
    initMap(map, data);
    isMapReady = true;
}

onMounted(() => {
    if (window.kakao && window.kakao.maps) {
        map.value = new kakao.maps.Map(document.getElementById('map') as HTMLElement, {
            center: new kakao.maps.LatLng(37.4986211, 127.0280297),
            level: 3,
        });
    } else {
        const script = document.createElement('script');
        script.src = 'http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=a7c8dc5e9a80d7a0d9c12c5d44404383';
        document.head.appendChild(script);
        script.onload = () => kakao.maps.load(() => (initMap(map, data)));
    }
    fetchData();

    const token = sessionStorage.getItem('jwtToken');
    if (token) {
        const decodedToken = jwtDecode(token);
        store.commit('setLoginData', decodedToken);
        store.commit('setOnToken', true);
    }

    //console.log('메인의 데이터 ', store.state.loginData)
    //console.log('메인의 토큰 ', store.state.isOnToken)
});




</script>

<template>
    <section class="map_wrap">
        <storeMapsCont :data="data" :map="map" :isMapReady="isMapReady" />
        <div id="map" v-if="isMapReady === true"></div>
        <div id="map" class="isMapReadyFalse" v-else="isMapReady === true">
            <div class="d-flex justify-content-center">
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
        <!-- <TipOffButton />
        <LoginButton /> -->
    </section>
</template>
