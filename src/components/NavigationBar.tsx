import React, { useEffect, useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import LampIcon from "./LampIcon";

const NavigationBar: React.FC = () => {
  const location = useLocation();

  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setExpanded(false);
  }, [location]);

  return (
    <Navbar className={"navbar " + (expanded ? "navbar_expanded" : "")}>
      <div className="navbar__head">
        <Navbar.Brand>
          <Nav.Link className="navbar__logo" as={Link} to="/">
            <h2>Да будет</h2>
            <LampIcon className="navbar__logo-icon" color="#f7ca59" />
          </Nav.Link>
        </Navbar.Brand>
        <button
          className="button button_neutral navbar__togglebtn"
          onClick={() => {
            setExpanded(!expanded);
          }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
      <div className="navbar__links">
        <Nav.Link
          className={
            "navbar__link " +
            (location.pathname == "/" ? "navbar__link_active" : "")
          }
          as={Link}
          to="/"
        >
          Главная
        </Nav.Link>
        <Nav.Link
          className={
            "navbar__link " +
            (["/lamps", "/lamps/"].includes(location.pathname)
              ? "navbar__link_active"
              : "")
          }
          as={Link}
          to="/lamps"
        >
          Лампы
        </Nav.Link>
      </div>
    </Navbar>
  );
};

export default NavigationBar;
