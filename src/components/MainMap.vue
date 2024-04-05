<script setup lang="ts">
import { onMounted } from 'vue';

const initMap = () => {
  const mapContainer = document.getElementById('map');
  const mapOption = {
    center: new kakao.maps.LatLng(37.56620, 126.92053),
    level: 1,
  };
  new kakao.maps.Map(mapContainer as HTMLElement, mapOption);
};

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
  <div id="map"></div>
</template>

<style scoped>
#map{
    width:100vw;
    height:100vh;
    margin: 0;
    padding: 0;
}
</style>
