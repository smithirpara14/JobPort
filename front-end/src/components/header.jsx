import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  isAuthenticated,
  isEmployer,
  isCandidate,
  isAdmin,
} from "../controllers/auth";
import ProfileMenu from "./profileMenu";

const Header = () => {
  return (
    <Navbar expand="lg" variant="dark" className="jp-bg-primary">
      <Container>
        <Navbar.Brand href="/" className="fs-2 fw-bold">
          JobPort
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link href="/" className="text-light fs-5">
              Home
            </Nav.Link>
            {isAuthenticated() && isEmployer() && (
              <Nav.Link href="/recruiter/jobposts" className="text-light">
                Jobs
              </Nav.Link>
            )}
            {isAuthenticated() && isCandidate() && (
              <Nav.Link href="/jobposts" className="text-light fs-5">
                Jobs
              </Nav.Link>
            )}
            {isAuthenticated() && isAdmin() && (
              <Nav.Link href="/admin" className="text-light">
                Admin
              </Nav.Link>
            )}
            <Nav.Link href="/about" className="text-light fs-5">
              About
            </Nav.Link>
          </Nav>
          <Nav className="ml-auto">
            {isAuthenticated() ? (
              <ProfileMenu />
            ) : (
              <>
                <Nav.Link href="/login" className="text-light">
                  Login
                </Nav.Link>
                <Nav.Link href="/register" className="text-light">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
