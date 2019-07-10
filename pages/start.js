import React,{Component} from 'react';
import {Form, Button, Container, Row, Col} from "react-bootstrap";
import Header from '../components/layout';

export default class Start extends Component{

    constructor(props){
        super(props);

        this.state = {
            title: "Página Inicial"
        }
    }

    render() {
        return(
            <div>
                <Header title={this.state.title}></Header>
            </div>
        )
    }
}
