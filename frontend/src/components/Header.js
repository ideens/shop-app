import React from 'react'
import { Nav, Navbar, Container, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
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
          <LinkContainer to="">
            <Navbar.Brand className="px-3">Shop Name</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i> Cart
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/login">
                <Nav.Link>
                  <i className="fas fa-user"></i> Login
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
