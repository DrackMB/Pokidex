import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Container , Nav } from "react-bootstrap";
import ModelAdd from "./ModelAdd";

const Header = () => {
  return (
    <header>
      <Navbar className="nav" bg="" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className="navL">
              <img
                className="logo"
                title="Reset Game"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/2000px-International_Pok%C3%A9mon_logo.svg.png"
                alt="Pokemon"
              />
            </Navbar.Brand>
          </LinkContainer>
          <Nav className="justify-content-end">
            <ModelAdd/>
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
