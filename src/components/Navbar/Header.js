import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";

import User from "./User";
import Guest from "./Guest";
import Admin from "./Admin";
import { AppContext } from "../../context/AppContext";
import { logo } from "../../assets";

const Header = () => {
  const router = useHistory();
  const [state, dispatch] = useContext(AppContext);

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
    router.push("/");
  };

  const hadleHome = () => {
    router.push("/");
  };

  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="fixed-top" bg="white">
        <Container className="d-flex justify-content-between mt-3">
          <Navbar.Brand>
            <img src={logo} onClick={hadleHome} alt="Waysbucks" width="70px" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            {state.isLogin ? (
              state.user.role === "Administrator" ? (
                <Admin handleLogout={handleLogout} />
              ) : (
                <User handleLogout={handleLogout} />
              )
            ) : (
              <Guest />
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
