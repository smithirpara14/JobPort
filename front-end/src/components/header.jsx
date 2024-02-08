import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { isAuthenticated } from "../controllers/auth";
const Header = () => {
  return (
    <Navbar
      className="rounded-bottom-5 px-4 mb-4"
      style={{
        backgroundColor: "#6A00C9",
        width: "80%",
        margin: "auto",
      }}
      variant="dark"
      expand="lg"
    >
      <Navbar.Brand href="/" className="mr-auto">
        JobPort
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav>
          <Nav.Link href="/" className="text-light">
            Home
          </Nav.Link>
          <Nav.Link href="/jobs" className="text-light">
            Jobs
          </Nav.Link>
          <Nav.Link href="/about" className="text-light">
            About
          </Nav.Link>
          {isAuthenticated() ? (
            <Nav.Link href="/logout" className="text-light">
              Logout
            </Nav.Link>
          ) : (
            <Nav.Link href="/login" className="text-light">
              Login
            </Nav.Link>
          )}
          <Nav.Link href="/register" className="text-light">
            Register
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
