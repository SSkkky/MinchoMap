let ps;
let infowindow;
let marker;
let markers: any = [];
let itemEl;

export const initMap = (map) => {
    // console.log('map', map)
    psFn();
    infowindow = new kakao.maps.InfoWindow({ zIndex: 1 })
}

export const psFn = () => { // 장소 검색 객체를 생성합니다
    ps = new kakao.maps.services.Places();
}

export const searchPlaces = (keyword: string) => {
    if (keyword.length < 1) {
        alert('키워드를 입력해주세요!');
        return false;
    }

    ps.keywordSearch(keyword, placesSearchCB);
}

export const placesSearchCB = (places, status) => {
    // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
    if (status === kakao.maps.services.Status.OK) {
        console.log(places)
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        alert('검색 결과가 존재하지 않습니다.');
        return;
    } else if (status === kakao.maps.services.Status.ERROR) {
        alert('검색 결과 중 오류가 발생했습니다.');
        return;
    }
}

// export const displayPlaces = (places, infowindow, map) => {
//     let listEl = document.getElementById('placesList') as HTMLElement,
//         menuEl = document.getElementById('menu_wrap') as HTMLElement,
//         fragment = document.createDocumentFragment(),
//         bounds = new kakao.maps.LatLngBounds(),
//         listStr = '';


//     // removeAllChildNods(listEl);
//     // removeMarker(markers);

//     // console.log(places)
//     // for (let i = 0; i < places.length; i++) { // 마커를 생성하고 지도에 표시합니다
//     //     let placePosition = new kakao.maps.LatLng(places[i].y, places[i].x);
//     //     marker = addMarker(placePosition, i, map);
//     //     itemEl = getListItem(i, places[i]);
//     //     // window.alert(itemEl)

//     //     fragment.appendChild(itemEl);
//     // }

//     // listEl.appendChild(fragment);
//     // menuEl.scrollTop = 0;

//     // map.setBounds(bounds);
// }

function removeAllChildNods(el) {
    while (el.hasChildNodes()) {
        el.removeChild(el.lastChild);
    }
}

function getListItem(index, places) {

    let el = document.createElement('li'),
        itemStr = '<span class="markerbg marker_' + (index + 1) + '"></span>' +
            '<div class="info">' +
            '   <h5>' + places.place_name + '</h5>';

    if (places.road_address_name) {
        itemStr += '    <span>' + places.road_address_name + '</span>' +
            '   <span class="jibun gray">' + places.address_name + '</span>';
    } else {
        itemStr += '    <span>' + places.address_name + '</span>';
    }

    itemStr += '  <span class="tel">' + places.phone + '</span>' +
        '</div>';

    el.innerHTML = itemStr;
    el.className = 'item';

    return el;
}

function displayPagination(pagination) {
    let paginationEl = document.getElementById('pagination') as HTMLElement,
        fragment = document.createDocumentFragment(),
        i;

    while (paginationEl.hasChildNodes()) {
        paginationEl.removeChild(paginationEl.lastChild as ChildNode);
    }

    for (i = 1; i <= pagination.last; i++) {
        let el = document.createElement('a');
        el.href = "#";
        el.innerHTML = i;

        if (i === pagination.current) {
            el.className = 'on';
        } else {
            el.onclick = (function (i) {
                return function () {
                    pagination.gotoPage(i);
                }
            })(i);
        }

        fragment.appendChild(el);
    }
    paginationEl.appendChild(fragment);
}

// export const removeMarker = (markers) => {
//     for (let i = 0; i < markers.length; i++) {
//         markers[i].setMap(null);
//     }
//     markers = [];
// }

// export const addMarker = (placePosition, idx, map) => {
//     let imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png'; // 마커 이미지 url, 스프라이트 이미지를 씁니다
//     let imageSize = new kakao.maps.Size(36, 37);  // 마커 이미지의 크기
//     let imgOptions = {
//         spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
//         spriteOrigin: new kakao.maps.Point(0, (idx * 46) + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
//         offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
//     }
//     let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions);
//     marker = new kakao.maps.Marker({
//         position: placePosition, // 마커의 위치
//         image: markerImage
//     });
//     console.log('')
//     marker.setMap(map); // 지도 위에 마커를 표출합니다
//     markers.push(marker);  // 배열에 생성된 마커를 추가합니다

//     return marker;
// }