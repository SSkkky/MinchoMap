<script setup lang="ts">

// json 데이터를 만들어서 커스텀 오버레이와 마커 표시를 합칠까...
// https://apis.map.kakao.com/web/sample/markerWithCustomOverlay/
// https://apis.map.kakao.com/web/sample/multipleMarkerImage/
import { useStore } from 'vuex';
import { onMounted, computed } from 'vue';

const store = useStore();
const data = computed(() => (store.state.data));

onMounted(() => {
    return store.getters.getData
});


const initMap = () => {
    new kakao.maps.InfoWindow({ zIndex: 1 });
    const mapContainer = document.getElementById('map');
    const mapOption = {
        center: new kakao.maps.LatLng(37.4986211, 127.0280297),
        level: 3,
    };
    const map = new kakao.maps.Map(mapContainer as HTMLElement, mapOption);

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
            map.setCenter(locPosition);
        });

    } else {
        var locPosition = new kakao.maps.LatLng(37.4986211, 127.0280297);
        map.setCenter(locPosition);
    }

    // 이미지 마커와 커스텀 오버레이
    // https://apis.map.kakao.com/web/sample/markerWithCustomOverlay/
    var imageSrc = 'https://firebasestorage.googleapis.com/v0/b/choding.appspot.com/o/gom%2Fmarker_40_60.png?alt=media&token=9ef5864c-6783-4725-a569-a70f6537d3dc', // 마커이미지의 주소입니다    
        imageSize = new kakao.maps.Size(40, 60), // 마커이미지의 크기입니다
        imageOption = { offset: new kakao.maps.Point(40, 60) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

    // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
        markerPosition = new kakao.maps.LatLng(37.4986211, 127.0280297); // 마커가 표시될 위치입니다

    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
        position: markerPosition,
        image: markerImage // 마커이미지 설정 
    });

    marker.setMap(map);

    // 커스텀 오버레이에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다

    console.log(data)

    var content = `<div class="customoverlay">
            <a href="https://map.kakao.com/link/map/11394059" target="_blank">
                <span class="title">${JSON.stringify(data.value.storeName)}</span>
            </a>
        </div>`;

    // 커스텀 오버레이가 표시될 위치입니다 
    var position = new kakao.maps.LatLng(37.4986211, 127.0280297);

    // 커스텀 오버레이를 생성합니다
    new kakao.maps.CustomOverlay({
        map: map,
        position: position,
        content: content,
        yAnchor: 1
    });

}

onMounted(() => {
    if (window.kakao && window.kakao.maps) {
        initMap();
    } else {
        const script = document.createElement('script');
        script.src = 'http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=a7c8dc5e9a80d7a0d9c12c5d44404383';
        document.head.appendChild(script);
        script.onload = () => kakao.maps.load(initMap);
    }
});
</script>


<template>
    <div class="map_wrap">
        <div id="map" style="width:100%;height:100%;position:relative;overflow:hidden;"></div>



        <!-- <div id="menu_wrap" class="bg_white">
            <div class="option">
                <div>
                    <form onsubmit="searchPlaces(); return false;">
                        키워드 : <input type="text" value="민트초코" id="keyword" size="15">
                        <button type="submit">검색하기</button>
                    </form>
                </div>
            </div>
            <hr>
            <ul id="placesList"></ul>
            <div id="pagination"></div>
        </div> -->
    </div>
</template>

<style scoped>
/* #menu_wrap {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
} */
</style>
