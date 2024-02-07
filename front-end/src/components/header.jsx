import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const Header = () => {
  return (
    <Navbar style={{ backgroundColor: "#3a41c6" }} variant="dark" expand="lg">
      <Navbar.Brand href="/">JobPort</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/" className="text-light">
            Home
          </Nav.Link>
          <Nav.Link href="/jobs" className="text-light">
            Jobs
          </Nav.Link>
          <Nav.Link href="/about" className="text-light">
            About
          </Nav.Link>
        </Nav>
        <Nav className="ml-auto">
          <Nav.Link href="/login" className="text-light">
            Login
          </Nav.Link>
          <Nav.Link href="/register" className="text-light">
            Register
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
