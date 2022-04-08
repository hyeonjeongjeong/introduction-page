window.onload = function ()
{

    var mapContainer = document.getElementById('map'),
    mapOption = {
        center: new kakao.maps.LatLng(37.583749, 126.999955),
        level: 5
        };
    var map = new kakao.maps.Map(mapContainer, mapOption);
    var markerPosition = new kakao.maps.LatLng(37.583749, 126.999955);
    var marker = new kakao.maps.Marker({
        position: markerPosition
    });
    var infowindow = new kakao.maps.InfoWindow({
    });
    marker.setMap(map);
    var point = markerPosition;
    var roadviewContainer = document.getElementById('roadview'); //로드뷰를 표시할 div
    let roadviewbox = document.getElementById("roadview_box");
    let change = 0;


    function roadview() {
            var roadview = new kakao.maps.Roadview(roadviewContainer); //로드뷰 객체
            var roadviewClient = new kakao.maps.RoadviewClient(); //좌표로부터 로드뷰 파노ID를 가져올 로드뷰 helper객체
            var position = point;
            // 특정 위치의 좌표와 가까운 로드뷰의 panoId를 추출하여 로드뷰를 띄운다.
            roadviewClient.getNearestPanoId(position, 50, function (panoId) {
                roadview.setPanoId(panoId, position); //panoId와 중심좌표를 통해 로드뷰 실행
            });
        
    }

    roadview();

    function click_move(event) {
        marker.setMap(null);
        infowindow.close();
        let loc = event.target.getAttribute("value");
        var geocoder = new kakao.maps.services.Geocoder();

        geocoder.addressSearch(loc, function (result, status) {

            if (status === kakao.maps.services.Status.OK) {

                var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                point = coords;
                marker = new kakao.maps.Marker({
                    map: map,
                    position: coords
                });
                infowindow = new kakao.maps.InfoWindow({
                    content: '<div style="width:150px;text-align:center;padding:6px 0;">' + event.target.textContent+'</div>'
                });
                infowindow.open(map, marker);
                roadview();
                map.setCenter(coords);
            }
        });
    }


    //마커 및 위치 이동
    function displayMarker(locPosition, message) {
        roadview();
        marker.setMap(null);
        marker = new kakao.maps.Marker({
            map: map,
            position: locPosition
        });
        var iwContent = message,
            iwRemoveable = true;

        infowindow = new kakao.maps.InfoWindow({
            content: iwContent,
            removable: iwRemoveable
        });
        infowindow.open(map, marker);
        map.setCenter(locPosition);

    }



    let now = document.querySelector(".now");
    now.addEventListener("click", () => {
        if (navigator.geolocation) {

            navigator.geolocation.getCurrentPosition(function (position) {

                var lat = position.coords.latitude, // 위도
                    lon = position.coords.longitude; // 경도

                var locPosition = new kakao.maps.LatLng(lat, lon),
                    message = "현재위치입니다";
                point = locPosition;
                displayMarker(locPosition, message);
            });

        } else {
            var locPosition = new kakao.maps.LatLng(33.450701, 126.570667),
                message = 'geolocation을 사용할수 없어요..'
            displayMarker(locPosition, message);
        }
    });

    let click_btn = document.querySelector("#move");
    click_btn.addEventListener("click", click_move);

    let view = document.querySelector(".view");
    view.addEventListener("click", () => {
        if (change == 0) {
            roadviewbox.style.display = "block";
            mapContainer.style.display = "none";
            document.querySelector('.view').textContent="지도"
            change = 1;
        }
        else {
            roadviewbox.style.display = "none";
            mapContainer.style.display = "block";
            document.querySelector('.view').textContent = "로드뷰"
            change = 0;
        }
    });
}

