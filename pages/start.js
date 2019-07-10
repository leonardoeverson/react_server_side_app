import React from 'react';
import Header from '../components/layout';

export default class Start extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            title: "Página Inicial"
        }
    }

    render() {
        <Header title={this.state.title}></Header>
        return(
            <div></div>
        )
    }
}
