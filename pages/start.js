import React, { Component } from 'react';
import { Container, Row, Form, Col, Button} from 'react-bootstrap';
import Layout from '../components/layout';
import Header from '../components/Header';
import Maps from '../components/gmaps';
import CardList from '../components/cardlist'
import Pagination from '../components/pagination'
import '../css/maps.css';

//Not Used
//import $ from 'jquery';
//import MapLoader from '../components/gmaps_loader';
export default class Start extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: "Página Inicial",
            infoWindow:"",
            latlngbounds:"",
            directionsService:"",
            map:"",
            activePage: 0,
            result_list_bool: false,
            card_list:[],
            markers:[],
            marker_number:0
        }

        this.setMakers = this.setMakers.bind(this);
        this.setInfoWindow = this.setInfoWindow.bind(this);
        this.setLatLngBounds = this.setLatLngBounds.bind(this);
        this.setDirectionsService = this.setDirectionsService.bind(this);
        this.setMapView = this.setMapView.bind(this);
        this.setDirectionsRenderer = this.setDirectionsRenderer.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.getCardList = this.getCardList.bind(this);
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

    setMakers(geocoder, address, name){
           
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

    componentDidMount(){
        this.setInfoWindow();

        this.setLatLngBounds();

        this.setDirectionsService();

        this.setMapView();   

        this.setDirectionsRenderer();

        fetch('/dados')
            .then((res) => {
                if(res.status == 200){
                    return res.json()
                }
            }).then((json)=>{
                //let geocoder = new google.maps.Geocoder()
                this.setState({
                    result_list: json.result,
                    activePage: 1
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }


    getCardList(itensbyPage = 5, page = 1){
        let list = [];
        let geocoder = new google.maps.Geocoder();

        if(typeof(this.state.card_list) !== "undefined" && this.state.card_list.length > 0){
            this.setState({
                card_list:[]
            })

            this.cleanMarkers();
        }

        for(let i = itensbyPage * (page - 1); i < itensbyPage * page; i++){
            let name = this.state.result_list[i].name;
            let address = this.state.result_list[i].address;
            this.setMakers(geocoder, address, name)
            list.push(<CardList key={i} name={name} address={address}></CardList>)
        }

        return list;
    }

    cleanMarkers(){
        
        for (var i = 0; i < this.state.markers.length; i++) {
            this.state.markers[i].setMap(null);
        }

        this.setState({
            markers:[]
        })
    }

    handleClick(event){
        this.setState({
            activePage: Number(event.target.innerText),
            card_list: this.getCardList(7, Number(event.target.innerText) )
        })

    }

    render() {

        if(this.state.result_list && this.state.result_list_bool == false){
            this.setState({
                result_list_bool: true,
                card_list: this.getCardList(7)
            })
        }   

        return (
            <div>
                <Layout title={this.state.title}></Layout>
                <Header></Header>
                <Maps></Maps>
                <Container fluid="true">
                    <Row>
                        <Col className="col-sm-8">
                            <div id="map"></div>
                        </Col>
                        <Col className="col-sm-2">
                            <h1>Resultados</h1>
                            <hr/>
                            {this.state.card_list}
                            <Pagination activePage={this.state.activePage} handleClick={this.handleClick}/>
                        </Col>
                    </Row>
                    <Row>
                    </Row>
                </Container>
            </div>
        )
    }
}