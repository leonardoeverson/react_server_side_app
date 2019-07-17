import React, {Component} from 'react';
import {Card, Button} from 'react-bootstrap'

export default class CardList extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
            return (
                <Card style={{ width: '25rem' , marginTop:'10px'}}>
                    <Card.Body>
                        {/* <Card.Title></Card.Title> */}
                        <Card.Text style={{fontSize:'10px'}}>
                            {this.props.name}
                            <br></br>
                            {this.props.address}
                        </Card.Text>
                        {/* <Button variant="primary">Go somewhere</Button> */}
                    </Card.Body>
                </Card>
            )
    }
}