import React, { Component } from 'react';
import { Form, Button, Container, Row, Col, Navbar, Nav, FormControl } from "react-bootstrap";
import Layout from '../components/layout';
import Header from '../components/header';

export default class Import extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: "Importação de Dados"
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event) {

        event.preventDefault();
        let dados = new FormData(event.target);

        fetch('/upload', {
            method: 'post',
            body: dados
        })
    }


    render() {
        return (
            <div>
                <Layout title={this.state.title}></Layout>
                <Header></Header>
                <Container>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="formBasic">
                            <Form.Label>Resumo</Form.Label>
                            <Form.Control as="select" name="resumo">
                                <option value="1">Semanal</option>
                                <option value="2">Mensal</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formBasic">
                            <Form.Label>Síntese dos Preços Praticados </Form.Label>
                            <Form.Control as="select" name="sintese">
                                <option value="1">Brasil</option>
                                <option value="2">Estado</option>
                                <option value="3">Cidade</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formBasic">
                            <Form.Label>Selecione o tipo</Form.Label>
                            <Form.Control as="select" name="tipo">
                                <option value="1">Gasolina</option>
                                <option value="2">Álcool</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formBasic">
                            <Form.Label>Linha Inicial da Leitura</Form.Label>
                            <Form.Control type="number" name="linha_inicial" required />
                        </Form.Group>
                        <Form.Group controlId="formBasic">
                            <Form.Label>Linha Final da Leitura</Form.Label>
                            <Form.Control type="number" name="linha_final" required />
                        </Form.Group>
                        <Form.Group controlId="formBasic">
                            <Form.Label>Arquivo para importação</Form.Label>
                            <Form.Control type="file" name="file" required />
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