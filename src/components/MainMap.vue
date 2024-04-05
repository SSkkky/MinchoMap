<script setup lang="ts">
import { onMounted } from 'vue';

const initMap = () => {
  const mapContainer = document.getElementById('map'); // 지도를 표시할 div
  const mapOption = {
    center: new kakao.maps.LatLng(37.56620, 126.92053), // 지도의 중심좌표
    level: 1, // 지도의 확대 레벨
  };
    const map = new kakao.maps.Map(mapContainer, mapOption);
  //https://apis.map.kakao.com/web/sample/changeLevel/
};

onMounted(() => {
  if (window.kakao && window.kakao.maps) {
    initMap();
  } else {
    const script = document.createElement('script');
    script.onload = () => kakao.maps.load(initMap);
    script.src = 'http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=a7c8dc5e9a80d7a0d9c12c5d44404383';
    document.head.appendChild(script);
  }
});
</script>


<template>
  <div id="map" style="width:500px;height:400px;"></div>
</template>

<style scoped>
#map{
    width:500px;
    height:400px;
}
</style>
