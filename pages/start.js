import React, { Component } from 'react';
import { Container, Row, Form, Col, Button} from 'react-bootstrap';
import Layout from '../components/layout';
import Header from '../components/Header';
import Maps from '../components/gmaps';
import MapsView from '../components/gmaps_loader'
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

        this.handleClick = this.handleClick.bind(this);
        this.getCardList = this.getCardList.bind(this);
        
    }

    
    componentDidMount(){

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
        
        if(typeof(this.state.card_list) !== "undefined" && this.state.card_list.length > 0){
            this.setState({
                card_list:[]
            })

            //this.cleanMarkers();
        }

        for(let i = itensbyPage * (page - 1); i < itensbyPage * page; i++){
            let name = this.state.result_list[i].name;
            let address = this.state.result_list[i].address;
            list.push(<CardList key={i} name={name} address={address}></CardList>)
        }

        return list;
    }

    handleClick(value){

        let activePage = this.state.activePage;
        
        if(value == 1){
            if(activePage >= 0)
                activePage--;
        }else{
            activePage++;
        }
        
        this.setState({
            activePage: activePage,
            card_list: this.getCardList(7, activePage )
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
                            <MapsView markers={this.state.markers}></MapsView>
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