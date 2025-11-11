import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import LampIcon from "./LampIcon";

const NavigationBar: React.FC = () => {
  return (
    <Navbar className="navbar">
      <Navbar.Brand>
        <Nav.Link className="navbar__logo" as={Link} to="/">
          <h2>Да будет</h2>
          <LampIcon className="navbar__logo-icon" />
        </Nav.Link>
      </Navbar.Brand>
    </Navbar>
  );
};

export default NavigationBar;
