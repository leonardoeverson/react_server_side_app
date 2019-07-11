import { Form, Button, Container, Row, Col, Navbar, Nav, FormControl } from "react-bootstrap";

export default () =>{
    return(
        <Navbar bg="ligth" variant="ligth">
            <Navbar.Brand href="#"></Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="/start">Home</Nav.Link>
                <Nav.Link href="/search">Pesquisa</Nav.Link>
                <Nav.Link href="/import">Meus Dados</Nav.Link>
            </Nav>
            <Nav>
                <Nav.Link href="/logout">Sair</Nav.Link>
            </Nav>
        </Navbar>
    )
}