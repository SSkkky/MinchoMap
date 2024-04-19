export const initMap = (map, data?) => {
    new kakao.maps.InfoWindow({ zIndex: 1 });
    // -------------------------------------
    // 지도 컨트롤 https://apis.map.kakao.com/web/sample/addMapControl/
    var mapTypeControl = new kakao.maps.MapTypeControl();
    map.value.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

    var zoomControl = new kakao.maps.ZoomControl();
    map.value.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
    // -------------------------------------
    // 현재 위치 얻어오기 https://apis.map.kakao.com/web/sample/geolocationMarker/
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var lat = position.coords.latitude, // 위도
                lon = position.coords.longitude; // 경도
            var locPosition = new kakao.maps.LatLng(lat, lon);
            map.value.setCenter(locPosition);
        });
    } else {
        var locPosition = new kakao.maps.LatLng(37.4986211, 127.0280297);
        map.value.setCenter(locPosition);
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

        marker.setMap(map.value);


        // 커스텀 오버레이 생성
        var content = `<div class="customoverlay">
            <h2 class="title">${item.storeName}</h2>
            <a href="/detail/${item.id}">
                자세히보기
            </a>
        </div>`;

        var position = new kakao.maps.LatLng(item.coordinate.y, item.coordinate.x);

        new kakao.maps.CustomOverlay({
            map: map.value,
            position: position,
            content: content,
            yAnchor: 1
        });
    })
}