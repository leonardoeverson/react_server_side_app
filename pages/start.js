import React, { Component } from 'react';
import {Container, Row, Form} from 'react-bootstrap';
import Layout from '../components/layout';
import Header from '../components/Header'

export default class Start extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: "Página Inicial"
        }
    }

    render() {
        return (
            <div>
                <Layout title={this.state.title}></Layout>
                <Header></Header>
                <Container>
                    <Row>

                    </Row>
                </Container>

            </div>
        )
    }
}
