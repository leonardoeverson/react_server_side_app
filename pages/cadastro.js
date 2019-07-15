import React, {Component} from "react";
import {Form, Button, Container, Col, Row} from "react-bootstrap";
import Layout from '../components/layout';
import Alerts from '../components/alerts';

export default class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            name:"",
            password1: "",
            password2:"",
            show_alert:false
        };

        //this.handleSubmit = this.handleSubmit.bind(this);
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
        ).then((response)=>{
                if(response.status === 200){
                    this.setState({
                        msg:"Cadastro Concluído com sucesso",
                        variant:"success",
                        show_alert:true
                    })
                }else{
                    this.setState({
                        msg:"Houve um erro ao realizar o cadastro",
                        variant:"warning",
                        show_alert:true
                    })
                }
            }
        )
    };

    render() {
        return (
            <div>
                <Layout title="Página de Cadastro"></Layout>
                <Container>
                    <Alerts msg={this.state.msg} variant={this.state.variant} show={this.state.show_alert}></Alerts>
                    <Row className="row_cadastro">
                        <Col sm={8}>
                            <h4>Formulário de Cadastro</h4>
                            <hr/>
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Nome</Form.Label>
                                    <Form.Control type="text" placeholder="" name="name"/>
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
