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
            activePage: 0
        }

        this.codeAddress = this.codeAddress.bind(this);
        this.setInfoWindow = this.setInfoWindow.bind(this);
        this.setLatLngBounds = this.setLatLngBounds.bind(this);
        this.setDirectionsService = this.setDirectionsService.bind(this);
        this.setMapView = this.setMapView.bind(this);
        this.setDirectionsRenderer = this.setDirectionsRenderer.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.getCardList = this.getCardList.bind(this);
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


    codeAddress(event, geocoder, map, address) {
        geocoder.geocode({ 'address': address },(results, status)=>{
            if (status === 'OK') {
                //map.setCenter(results[0].geometry.location);
                let marker = new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location
                });

                return
            } else {
                console.log('Geocode was not successful for the following reason: ' + status);
            }
        });
    }

    getCardList(itensbyPage = 5, page = 1){
        let list = [];
        let i = itensbyPage * (page - 1);
        for(i=0; i < itensbyPage * page; i++){
            let name = this.state.result_list[i].name;
            let address = this.state.result_list[i].address;
            list.push(<CardList key={i} name={name} address={address}></CardList>)
        }

        return list;
    }

    handleClick(event){
        this.setState({
            activePage: Number(event.target.innerText)
        })
    }

    render() {

        let card_list;
        if(this.state.result_list){
            card_list = this.getCardList(6)
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
                            {card_list}
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