<script setup lang="ts">
import { onMounted } from 'vue';

const initMap = () => {
  var infowindow = new kakao.maps.InfoWindow({zIndex:1});
  const mapContainer = document.getElementById('map');
  const mapOption = {
    center: new kakao.maps.LatLng(37.56620, 126.92053),
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
  // 마커 https://apis.map.kakao.com/web/sample/basicMarkerImage/
  // var imageSrc = 'https://firebasestorage.googleapis.com/v0/b/choding.appspot.com/o/gom%2Fmarker.png?alt=media&token=2a443217-75e4-4ad2-8367-bc13e01cd336', 
  //   imageSize = new kakao.maps.Size(48, 60),
  //   imageOption = {offset: new kakao.maps.Point(27, 69)};
      
  // var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
  //     markerPosition = new kakao.maps.LatLng(37.56620, 126.92053);
  
  // var marker = new kakao.maps.Marker({
  //     position: markerPosition, 
  //     image: markerImage
  // });
  
  // marker.setMap(map);  

  // -------------------------------------
  // 현재 위치 얻어오기 https://apis.map.kakao.com/web/sample/geolocationMarker/
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        var lat = position.coords.latitude, // 위도
            lon = position.coords.longitude; // 경도
        var locPosition = new kakao.maps.LatLng(lat, lon);
        map.setCenter(locPosition);
      });
    
} else {
    var locPosition = new kakao.maps.LatLng(33.450701, 126.570667);
    map.setCenter(locPosition);
}

// -------------------------------------
// 키워드 검색 https://apis.map.kakao.com/web/sample/keywordBasic/
var ps = new kakao.maps.services.Places(); 

ps.keywordSearch('서울 민트초코', placesSearchCB); 

function placesSearchCB (data, status) {
    if (status === kakao.maps.services.Status.OK) {
        var bounds = new kakao.maps.LatLngBounds();

        for (var i=0; i<data.length; i++) {
            displayMarker2(data[i]);    
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }       

        map.setBounds(bounds);
    } 
}

function displayMarker2(place) {
    var marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x) 
    });

    kakao.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
        infowindow.open(map, marker);
    });
}
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
