import { Component } from 'react';
import { Container, Row, Form, Col} from 'react-bootstrap';
import Layout from '../components/layout';
import NavHeader from '../components/header';
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
            activePage: 0,
            result_list_bool: false,
            card_list:[],
            markers:[],
            marker_number:0,
            activeNext: false,
            activePrev: true,
            itemsbyPage: 4
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

    getCardList(itensbyPage = 7, page = 1){
        let list = [];
        
        if(typeof(this.state.card_list) !== "undefined" && this.state.card_list.length > 0){
            
            if((itensbyPage * page) > this.state.result_list.length){
                return;
            }

            this.setState({
                card_list:[]
            })
        }

        if(this.state.result_list.length > 0){

            for(let i = itensbyPage * (page - 1); i < itensbyPage * page; i++){
                let {name, address} = this.state.result_list[i];
                let sale_price = this.state.result_list[i].gs_sale_price;
                let purchase_price = this.state.result_list[i].gs_purchase_price;
                list.push(<CardList key={i} name={name} address={address} sale_price={sale_price} purchase_price={purchase_price}></CardList>)
            }

            return list;
        }
                
    }

    handleClick(value){

        let activePage = this.state.activePage;
        
        if(value == 1){
            activePage--;
            if(activePage <= 1 ){
                activePage = 1
                this.setState({
                    activePrev: true
                })
            }else{
                this.setState({
                    activePrev: false
                })
            }
        }else{
           
            if(activePage < this.state.result_list.length){
                activePage++;
            }else{
                this.setState({
                    activeNext: true
                })
            }
        }
                
        this.setState({
            activePage: activePage,
            card_list: this.getCardList(this.state.itemsbyPage, activePage)
        })
    }

    render() {

        if(this.state.result_list && this.state.result_list_bool == false){
            this.setState({
                result_list_bool: true,
                card_list: this.getCardList(this.state.itemsbyPage)
            })
        }   

        return (
            <div>
                <Layout title={this.state.title}></Layout>
                < NavHeader></ NavHeader>
                <Container fluid="true">
                    <Row>
                        <Col className="col-sm-7">
                            <MapsView markers={this.state.markers}></MapsView>
                        </Col>
                        <Col className="col-sm-3">
                            <h6>Preços para o período: --/--/---- a --/--/----</h6>
                            <Form.Control as="select" name="fuel">
                                <option value="1">Álcool</option>
                                <option value="2">Gasolina</option>
                            </Form.Control>
                            <hr/>
                            {this.state.card_list}
                            <Pagination handleClick={this.handleClick} activePrev={this.state.activePrev} activeNext={this.state.activeNext}/>
                        </Col>
                    </Row>
                    <Row>
                        Menor preço da Gasolina <br/>
                        Menor preço da Álcool
                    </Row>
                </Container>
            </div>
        )
    }
}