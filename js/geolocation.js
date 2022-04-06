window.onload = function () {
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
    marker.setMap(map);



    function location() {
        if (navigator.geolocation) {

            navigator.geolocation.getCurrentPosition(function (position) {

                var lat = position.coords.latitude, // 위도
                    lon = position.coords.longitude; // 경도

                var locPosition = new kakao.maps.LatLng(lat, lon),
                    message = "현재위치입니다";

                displayMarker(locPosition, message);
            });

        } else {

            var locPosition = new kakao.maps.LatLng(33.450701, 126.570667),
                message = 'geolocation을 사용할수 없어요..'

            displayMarker(locPosition, message);
        }
    }

    //마커 및 위치 이동
    function displayMarker(locPosition, message) {
        marker.setMap(null);
        var marker1 = new kakao.maps.Marker({
            map: map,
            position: locPosition
        });
        var iwContent = message,
            iwRemoveable = true;

        var infowindow = new kakao.maps.InfoWindow({
            content: iwContent,
            removable: iwRemoveable
        });
        infowindow.open(map, marker1);
        map.setCenter(locPosition);
    }

    //button 누른 객체의 value 값으로 이동
    function click_move(event) {
        let loc = event.target.getAttribute("value");
        let msg = event.target.textContent;
        let arrive = loc.split(", ");
        let lat = arrive[0];
        let lon = arrive[1];
        var locPosition = new kakao.maps.LatLng(lat, lon),
            message = msg;
        displayMarker(locPosition, message);
    }



    let now = document.querySelector(".now");
    now.addEventListener("click", location);

    let kimpo = document.querySelector("#move");
    kimpo.addEventListener("click", click_move);

}

