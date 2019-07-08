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
        if (this.state.show) {
            return (
                <Alert variant={this.props.variant} onClose={this.handleDismiss} dismissible>
                    <Alert.Heading>Mensagem</Alert.Heading>
                    <p>
                        {this.props.msg}
                    </p>
                </Alert>
            )
        };

        return <></>
    }
}

