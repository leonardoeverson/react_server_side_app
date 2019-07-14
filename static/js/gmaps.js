var source, destination, directionsDisplay, directionsService, map;

function initMapConf(){

    var infoWindow = new google.maps.InfoWindow();
    var latlngbounds = new google.maps.LatLngBounds();
    directionsService  = new google.maps.DirectionsService();
    map = new google.maps.Map(document.getElementById('mapa'), {
        zoom: 8,
        center: {lat:-3.71839,lng: -38.5267},
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    google.maps.event.addDomListener(window, 'load', function () {
         //new google.maps.places.SearchBox('Rua Dr. Pintor Antônio Bandeira,3283 , Praia Do Futuro');
        new google.maps.places.SearchBox(document.getElementById('local_evento'));
        directionsDisplay = new google.maps.DirectionsRenderer({ 'draggable': true });
        directionsDisplay.setMap(map);
    });

    // var bounds = new google.maps.LatLngBounds();
    // map.setCenter(latlngbounds.getCenter());
    // map.fitBounds(latlngbounds);
    // map.fitBounds(bounds);

    console.log('mapa carregado');
}

function distancia_destino(){

    //directionsDisplay.setPanel(document.getElementById('mapa'));

    //*********DIRECTIONS AND ROUTE**********************//
    source = 'Rua Dr. Pintor Antônio Bandeira,3283 , Praia Do Futuro';
    destination = document.getElementById("local_evento").value;
    
    if(destination.trim().length == 0)
        return;

    var request = {
        origin: source,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING
    };

    directionsService.route(request, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        }
    });

    //*********DISTANCE AND DURATION**********************//
    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix({
        origins: [source],
        destinations: [destination],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false
    }, function (response, status) {
        if (status == google.maps.DistanceMatrixStatus.OK && response.rows[0].elements[0].status != "ZERO_RESULTS") {
            var distance = response.rows[0].elements[0].distance.text;
            var duration = response.rows[0].elements[0].duration.text;

            try{
                map.setZoom(10);
                $(km)[0].value  = distance;
                $(tempo)[0].value = duration;
            }catch(e){
                console.log(e);
            }

        } else {
            alert("Não Foi possível encontrar uma rota até o destino");
        }
    });

}

$(document).ready(function() {
    $('#calculo').click(function() {
        distancia_destino();
    })    
});

