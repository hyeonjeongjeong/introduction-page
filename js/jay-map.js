


$(function () {



    let img = [
        { iname: "i-1", name: "아비꼬", add: "서울 종로구 대학로12길 22 " },
        { iname: "i-2", name: "돈돈정", add: "서울 종로구 대학로11길 46" },
        { iname: "i-3", name: "스데반카레", add: "서울 은평구 응암로22길 5-3" }

    ]


    let pic = document.querySelector('.food-pic');
    $(pic).css("width", "60%");
    $(pic).css("height", "auto");
    pic.setAttribute("src", "assets/img/" + img[0].iname + ".jpg");

    let current = 0;
    let prv = document.getElementById("prv");
    let next = document.getElementById("next");

    function prvphoto() {
        if (current == 0) {
            current = img.length - 1;
            pic.setAttribute("src", "assets/img/" + img[current].iname + ".jpg");
        }
        else {
            current -= 1;
            console.log(current);
            pic.setAttribute("src", "assets/img/" + img[current].iname + ".jpg");
        }
    }

    function nextphoto() {
        if (current == img.length - 1) {
            current = 0;
            pic.setAttribute("src", "assets/img/" + img[current].iname + ".jpg");
        }
        else {
            current += 1;
            console.log(current);
            pic.setAttribute("src", "assets/img/" + img[current].iname + ".jpg");
        }
    }


    prv.addEventListener("click", prvphoto);
    next.addEventListener("click", nextphoto);


    function click_move() {
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



        infowindow.close();
        console.log(img[current].add);
        let loc = img[current].add;
        var geocoder = new kakao.maps.services.Geocoder();

        geocoder.addressSearch(loc, function (result, status) {

            if (status === kakao.maps.services.Status.OK) {

                var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                marker = new kakao.maps.Marker({
                    map: map,
                    position: coords
                });
                infowindow = new kakao.maps.InfoWindow({
                    content: '<div style="width:150px;text-align:center;padding:6px 0;">' + img[current].name + '</div>'
                });
                infowindow.open(map, marker);
                map.setCenter(coords);
            }
        });
    }

    pic.addEventListener("click", function () {
            $(pic).hide();
            $('#map').show();
             click_move();

    });
    document.querySelector('#map').addEventListener("click", function () {
            $(pic).show();
            $('#map').hide();
    });

});






