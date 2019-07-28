import React from 'react';
import {Card} from 'react-bootstrap'

export default class CardList extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
            return (
                <Card style={{ width: '25rem' , marginTop:'10px'}}>
                    <Card.Body>
                        {/* <Card.Title></Card.Title> */}
                        <Card.Text style={{fontSize:'14px'}}>
                            <br/>Nome do Posto: {this.props.name}
                            <br/>Endereço: {this.props.address}
                            <br/>Preço de Compra: R$ {this.props.purchase_price}
                            <br/>Preço de Venda: R$ {this.props.sale_price}
                        </Card.Text>
                        {/* <Button variant="primary">Go somewhere</Button> */}
                    </Card.Body>
                </Card>
            )
    }
}