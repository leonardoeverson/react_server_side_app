import React, { Component } from 'react';
import Maps from '../components/gmaps';

export default class MapLoader extends React.Component{
    
    constructor(props){
        super(props)

        this.state = {
            markers: this.props.markers,
            map_loaded: false
        }

        this.setMakers = this.setMakers.bind(this);
        this.setInfoWindow = this.setInfoWindow.bind(this);
        this.setLatLngBounds = this.setLatLngBounds.bind(this);
        this.setDirectionsService = this.setDirectionsService.bind(this);
        this.setMapView = this.setMapView.bind(this);
        this.setDirectionsRenderer = this.setDirectionsRenderer.bind(this);
        this.cleanMarkers = this.cleanMarkers.bind(this);

    }

    setInfoWindow(event){
        this.setState({
            infoWindow: new google.maps.InfoWindow()
        })
    }

    setLatLngBounds(event){
        this.setState({
            latlngbounds: new google.maps.LatLngBounds()
        })
    }

    setDirectionsService(event){
        this.setState({
            directionsService: new google.maps.DirectionsService()
        })
    }

    setMapView(event){
        this.setState({
            map: new google.maps.Map(document.getElementById('map'), {
                zoom:13,
                center: {lat:-3.71839,lng: -38.5267},
                mapTypeId: google.maps.MapTypeId.ROADMAP
            })
        })
    }


    setMakers(geocoder, address, name){
        //let geocoder = new google.maps.Geocoder(); 
        geocoder.geocode({ 'address': address },(results, status)=>{
            if (status === 'OK') {
                
                let marker = this.state.markers;
                
                marker.push(new google.maps.Marker({
                    map: this.state.map,
                    label: this.state.marker_number.toString(),
                    position: results[0].geometry.location
                }))
                
                this.setState({
                    markers: marker,
                    marker_number: this.state.marker_number + 1
                })

                return;
            } else {
                console.log('Geocode was not successful for the following reason: ' + status);
            }

        });
    }

    
    setDirectionsRenderer(){
        this.setState({
            directionsDisplay: new google.maps.DirectionsRenderer({ 'draggable': true })
        })
    }

    cleanMarkers(){
    
        for (var i = 0; i < this.state.markers.length; i++) {
            this.state.markers[i].setMap(null);
        }

        this.setState({
            markers: []
        })
    
    }

    componentDidMount(){
        
        if (typeof (google) != "undefined") {
            
            //Esperando o mapa carregar
            this.setState({
                map_loader: true
            })
            
            this.setInfoWindow();

            this.setLatLngBounds();

            this.setDirectionsService();

            this.setMapView();

            this.setDirectionsRenderer();
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(typeof (google) != "undefined"){
            console.log('Google maps loaded...')
        }
    }

    render(){
        if(!this.state.map_loader){
            return(
                <div><h4>Mapa carregando...</h4></div>
            )
        }else{
            return(
            <div>
                <Maps></Maps>
               <div id="map"></div>
            </div>
        )
        
        }
        
    }
}
