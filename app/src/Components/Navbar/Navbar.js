import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';

import './Navbar.css';

import React from "react";

const NavigatonBar = () => {
  return(
    <Navbar bg="light" expand="lg" sticky="top" className="shadow-sm p-3 mb-5 bg-white rounded">
      <Container>
        <Navbar.Brand href="/">TextApp</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="text-center"> 
          <Nav className="start-0">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/register">Register</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigatonBar;