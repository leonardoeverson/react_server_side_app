import React, { Component } from 'react';
import { Container, Row, Form, Col } from 'react-bootstrap';
import Layout from '../components/layout';
import Header from '../components/Header'
import Maps from '../components/maps';
import '../css/maps.css';

export default class Start extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: "Página Inicial"
        }
    }

    componentDidMount() {
        const script = document.createElement("script");

        script.src = "static/js/maps.js";
        script.async = true;

        document.body.appendChild(script);
    }

    render() {
        return (
            <div>
                <Layout title={this.state.title}></Layout>
                <Header></Header>
                <Maps></Maps>
                <Container>
                    <Row>
                        <div className="col-md-8">
                            <div id="map"></div>  
                        </div>
                    </Row>
                </Container>
            </div>
        )
    }
}