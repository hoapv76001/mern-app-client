import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import LogoImg from "../../assets/logo.svg";
import LogoutIcon from "../../assets/logout.svg";
import Button from "react-bootstrap/Button";
import { AuthContext } from "../../contexts/AuthContext";

const NavbarMenu = () => {
  const {authState: {user: {username}}, logoutUser} = useContext(AuthContext)

  const logout = () => logoutUser()
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="primary"
      variant="dark"
      className="shadow"
    >
      <Container fluid>
        <Navbar.Brand>
          <img
            src={LogoImg}
            alt="LearnIt"
            width="32"
            height="32"
            className="me-2"
          />
          LearnIt
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link to="/dashboard" as={Link}>
              DashBoard
            </Nav.Link>
            <Nav.Link to="/about" as={Link}>
              About
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link disabled>Welcom {username}</Nav.Link>
            <Button variant="danger" onClick={logout}>
              <img src={LogoutIcon} alt="logout" width="32" height="32" className='me-2' />
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarMenu;