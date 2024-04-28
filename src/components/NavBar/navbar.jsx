import React from "react";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import BootstrapNavbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import "./navbar.scss";
import logoImage from "../../logo-image/logo.png";
import { useNavigate } from "react-router-dom";

export const NavBar = ({ user, onLogout }) => {
  const navigate = useNavigate();

  return (
    <BootstrapNavbar
      className="site-nav navbar-dark"
      data-bas-theme="dark"
      expand="md"
    >
      <Container className="m-3" fluid>
        <BootstrapNavbar.Brand className="text-light m-0 p-0">
          <img alt="My Flix Logo" src={logoImage} style={{ width: "12rem" }} />
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse
          id="basic-navbar-nav"
          className="justify-content-end"
        >
          <Nav className="align-items-end" style={{ marginRight: "1rem" }}>
            {user && (
              <>
                <Nav.Link className="text-light" as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link
                  className="text-light"
                  as={Link}
                  to="/users/${userId}"
                >
                  Profile
                </Nav.Link>
                <li>
                  <Nav.Link
                    onClick={() => {
                      onLogout(), navigate("/login");
                    }}
                    className="text-warning"
                  >
                    Logout
                  </Nav.Link>
                </li>
              </>
            )}
            {!user && (
              <>
                <Nav.Link className="text-light" as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link className="text-light" as={Link} to="/signup">
                  Sign up
                </Nav.Link>
              </>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

NavBar.propTypes = {
  onLogout: PropTypes.func.isRequired,
};
