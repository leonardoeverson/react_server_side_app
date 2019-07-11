import React, { Component } from 'react';
import { Form, Button, Container, Row, Col, Navbar, Nav, FormControl } from "react-bootstrap";
import Layout from '../components/layout';
import Header from '../components/header';

export default class Import extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title : "Importação de Dados"
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit() {

    }


    render() {
        return (
            <div>
                <Layout title={this.state.title}></Layout>
                <Header></Header>
                <Container>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Arquivo para importação</Form.Label>
                            <Form.Control type="file" placeholder="Enter email" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Container>
            </div>
        )
    }
}