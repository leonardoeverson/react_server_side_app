import React from 'react';
import {Alert} from "react-bootstrap";

export default class Alerts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        };

        this.handleDismiss = this.handleDismiss.bind(this);
    }

    handleDismiss = () => this.setState({show: false});

    render() {

            return (
                <Alert variant={this.props.variant} show={this.props.show} onClose={this.handleDismiss}>
                    <Alert.Heading>Mensagem</Alert.Heading>
                    <p>
                        {this.props.msg}
                    </p>
                </Alert>
            )

    }
}

