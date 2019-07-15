var source, destination, directionsDisplay, directionsService, map__;

function initMapConf(){

    var infoWindow = new google.maps.InfoWindow();
    var latlngbounds = new google.maps.LatLngBounds();
    directionsService  = new google.maps.DirectionsService();
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: {lat:-3.71839,lng: -38.5267},
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    google.maps.event.addDomListener(window, 'load', function () {
         //new google.maps.places.SearchBox('Rua Dr. Pintor Antônio Bandeira,3283 , Praia Do Futuro');
        new google.maps.places.SearchBox(document.getElementById('local_evento'));
        directionsDisplay = new google.maps.DirectionsRenderer({ 'draggable': true });
        directionsDisplay.setMap(map);
    });

    console.log('mapa carregado');
}

$(document).ready(function() {
    initMapConf(); 
});

