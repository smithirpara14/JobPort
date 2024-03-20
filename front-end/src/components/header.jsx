import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { isAuthenticated, isEmployer, isCandidate, isAdmin } from "../controllers/auth";
import ProfileMenu from "./profileMenu";
const Header = () => {
  return (
    <Navbar
      className="rounded-bottom-5 px-4 mb-4 container jp-bg-primary mv-0 mh-auto"
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
          {isAuthenticated() && isEmployer() ? (
            <>
              <Nav.Link href="/recruiter/jobposts" className="text-light">
                Jobs
              </Nav.Link>
            </>
          ) : (
            <>
            </>
          )}
          {isAuthenticated() && isCandidate() ? (
            <>
              <Nav.Link href="/jobposts" className="text-light">
                Jobs
              </Nav.Link>
            </>
          ) : (
            <>
            </>
          )}
          {isAuthenticated() && isAdmin() ? (
            <>
            </>
          ) : (
            <>
            </>
          )}
          <Nav.Link href="/about" className="text-light">
            About
          </Nav.Link>
          {isAuthenticated() ? (
            <>
              <ProfileMenu />
            </>
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
    </Navbar>
  );
};

export default Header;
