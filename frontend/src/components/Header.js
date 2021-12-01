import React from 'react'
import { Nav, Navbar, Container, Row, Col } from 'react-bootstrap'

const Header = () => {
  return (
    <header>
      <Navbar
        className="navbar navbar-expand-lg navbar-light bg-light"
        collapseOnSelect
      >
        <Container className="container-fluid">
          <Navbar.Brand href="/">canvas</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/cart">
                <i className="fas fa-shopping-cart"></i> Cart
              </Nav.Link>
              <Nav.Link href="/login">
                <i className="fas fa-user"></i> Login
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
