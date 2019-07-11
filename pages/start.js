import React, { Component } from 'react';
import {Layout, Header} from '../components/';

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
