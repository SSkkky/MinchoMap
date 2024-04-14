<script setup lang="ts">
import { mapDataType } from '../types/DataType';
import { useStore } from 'vuex';
import { onMounted, computed, ComputedRef } from 'vue';
import storeMapsCont from './storeMapsCont.vue';
import {initMap} from '../lib/KakaoMap';

const store = useStore();
const data: ComputedRef<mapDataType[]> = computed(() => (store.state.data));
let map;
let isMapReady = false;

async function fetchData() {
    await store.getters.getData;
    initMap(map, data);
    isMapReady = true;
}

onMounted(async() => {
    map = computed(() => (new kakao.maps.Map(document.getElementById('map') as HTMLElement, {
    center: new kakao.maps.LatLng(37.4986211, 127.0280297),
    level: 3,
    })));
    if (window.kakao && window.kakao.maps) {
        fetchData();
        // console.log('map', map)
    } else {
        const script = document.createElement('script');
        script.src = 'http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=a7c8dc5e9a80d7a0d9c12c5d44404383';
        document.head.appendChild(script);
        script.onload = () => kakao.maps.load(() => (initMap(map, data)));
    }
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
    </section>
</template>
