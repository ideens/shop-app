import React from 'react'
import { Nav, Navbar, Container, Row, Col, Offcanvas } from 'react-bootstrap'
import Sidebar from './Sidebar'

const Header = () => {
  return (
    <header>
      <Navbar
        className="navbar navbar-expand-lg navbar-light bg-light"
        collapseOnSelect
      >
        <Container className="container-fluid">
          <Sidebar />
          <Navbar.Brand href="/" className="px-3">
            Shop Name
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
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
