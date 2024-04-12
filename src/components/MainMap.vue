<script setup lang="ts">

import { mapDataType } from '../types/DataType';
import { useStore } from 'vuex';
import { onMounted, computed, ComputedRef, ref } from 'vue';
import storeMapsCont from './storeMapsCont.vue';

const store = useStore();
const data: ComputedRef<mapDataType[]> = computed(() => (store.state.data));
let map: ComputedRef<any> = computed(() => ((document.getElementById('map') as HTMLElement, {
    center: new kakao.maps.LatLng(37.4986211, 127.0280297),
    level: 3,
})));
let isMapReady = false;

async function fetchData() {
    await store.getters.getData;
    initMap();
    // console.log('------------데이터----------')
    // console.log(data.value)
    // console.log('---------------------------')
    isMapReady = true;
}

onMounted(() => {
    if (window.kakao && window.kakao.maps) {
        fetchData();
    } else {
        const script = document.createElement('script');
        script.src = 'http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=a7c8dc5e9a80d7a0d9c12c5d44404383';
        document.head.appendChild(script);
        script.onload = () => kakao.maps.load(initMap);
    }
});

const initMap = () => {
    new kakao.maps.InfoWindow({ zIndex: 1 });
    const mapContainer = document.getElementById('map');
    const mapOption = {
        center: new kakao.maps.LatLng(37.4986211, 127.0280297),
        level: 3,
    }
    // map.value = new kakao.maps.Map(mapContainer as HTMLElement, mapOption);
    map = new kakao.maps.Map(mapContainer as HTMLElement, mapOption);

    // -------------------------------------
    // 지도 컨트롤 https://apis.map.kakao.com/web/sample/addMapControl/
    var mapTypeControl = new kakao.maps.MapTypeControl();
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

    var zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
    // -------------------------------------
    // 현재 위치 얻어오기 https://apis.map.kakao.com/web/sample/geolocationMarker/
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var lat = position.coords.latitude, // 위도
                lon = position.coords.longitude; // 경도
            var locPosition = new kakao.maps.LatLng(lat, lon);
            MAP.setCenter(locPosition);
        });
    } else {
        var locPosition = new kakao.maps.LatLng(37.4986211, 127.0280297);
        MAP.setCenter(locPosition);
    }

    // -----------------------------------------------------------
    // 이미지 마커와 커스텀 오버레이
    const imageSrc = 'https://firebasestorage.googleapis.com/v0/b/choding.appspot.com/o/gom%2Fmarker_40_60.png?alt=media&token=9ef5864c-6783-4725-a569-a70f6537d3dc',
        imageSize = new kakao.maps.Size(40, 60),
        imageOption = { offset: new kakao.maps.Point(40, 60) };

    // ------------------ 데이터 배열 맵 ---------------------------
    data.value.forEach(item => {
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
            markerPosition = new kakao.maps.LatLng(item.coordinate.y, item.coordinate.x);

        var marker = new kakao.maps.Marker({
            position: markerPosition,
            image: markerImage
        });

        marker.setMap(map);


        // 커스텀 오버레이 생성
        var content = `<div class="customoverlay">
            <h2 class="title">${item.storeName}</h2>
            <a href="/detail/${item.id}">
                자세히보기
            </a>
        </div>`;

        var position = new kakao.maps.LatLng(item.coordinate.y, item.coordinate.x);

        new kakao.maps.CustomOverlay({
            map: map,
            position: position,
            content: content,
            yAnchor: 1
        });
    })
}

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
