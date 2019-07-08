import React, {Component} from "react";
import {Form, Button, Container, Row, Col} from "react-bootstrap";
import Header from '../components/layout'
import '../css/index.css'

export default class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""
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

        fetch('/login', {
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
                            <Form onSubmit={this.handleSubmit} className="Login">
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" name="email"/>
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Senha</Form.Label>
                                    <Form.Control type="password" placeholder="Password" name="password"/>
                                </Form.Group>
                                <Form.Group controlId="formBasicChecbox">
                                    <Form.Check type="checkbox" label="Lembra-me" name="remember"/>
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Entrar
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
