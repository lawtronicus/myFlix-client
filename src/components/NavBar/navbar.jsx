import React from "react";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Button } from "react-bootstrap";

export const NavBar = ({ onLogout }) => {
  return (
    <Navbar bg="primary" data-bas-theme="dark">
      <Container className="d-flex justify-content-between m-4" fluid>
        <Navbar.Brand className="text-light">My Logo</Navbar.Brand>
        <Nav>
          <Nav.Link className="text-light" href="/">
            Home
          </Nav.Link>
          <li>
            <Button onClick={onLogout}>Logout</Button>
          </li>
        </Nav>
      </Container>
    </Navbar>
  );
};

NavBar.propTypes = {
  onLogout: PropTypes.func.isRequired,
};
