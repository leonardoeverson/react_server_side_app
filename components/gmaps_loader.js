import React, { Component } from 'react';
import Maps from '../components/gmaps';

export default class MapLoader extends React.Component{
    
    constructor(props){
        super(props)

        this.state = {
            marker: this.props.markers
        }

        this.setInfoWindow = this.setInfoWindow.bind(this);
        this.setLatLngBounds = this.setLatLngBounds.bind(this);
        this.setDirectionsService = this.setDirectionsService.bind(this);
        this.setMapView = this.setMapView.bind(this);
        this.setDirectionsRenderer = this.setDirectionsRenderer.bind(this);
        
        this.cleanMarkers = this.cleanMarkers.bind(this);
    }

    setInfoWindow(event){
        this.setState({
            infoWindow: new google.maps.InfoWindow();
        })
    }

    setLatLngBounds(event){
        this.setState({
            latlngbounds: new google.maps.LatLngBounds();
        })
    }

    setDirectionsService(event){
        this.setState({
            directionsService: new google.maps.DirectionsService();
        })
    }

    setMapView(event){
        this.setState({
            map: new google.maps.Map(document.getElementById('map'), {
                zoom: 10,
                center: {lat:-3.71839,lng: -38.5267},
                mapTypeId: google.maps.MapTypeId.ROADMAP
            })
        })
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
        this.setInfoWindow();

        this.setLatLngBounds();

        this.setDirectionsService();

        this.setMapView();   

        this.setDirectionsRenderer();
    }

    componentDidUpdate(prevProps){

    }

    render(){
        return(
            <div>
               <div id="map"></div>
            </div>
        )
    }
}