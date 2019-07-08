import React, {Component} from "react";
import {Form, Button, Container, Col, Row} from "react-bootstrap";
import Header from '../components/layout'

export default class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            name:"",
            password1: "",
            password2:""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    handleSubmit = event => {
        event.preventDefault();
        let dados = new FormData(event.target);

        fetch('/cadastro', {
                method: 'post',
                body: dados
            }
        )
    };

    render() {
        return (
            <div>
                <Header title="Página Inicial"></Header>
                <Container>
                    <Row>
                        <Col sm={8}>
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Nome</Form.Label>
                                    <Form.Control type="text" placeholder="" name="nome"/>
                                </Form.Group>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" name="email"/>
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Senha</Form.Label>
                                    <Form.Control type="password" placeholder="Password" name="password1"/>
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Confirme a Senha</Form.Label>
                                    <Form.Control type="password" placeholder="Password" name="password2"/>
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Cadastrar
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>

            </div>
        );
    }
}
