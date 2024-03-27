import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { isCandidate } from "../../controllers/auth";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../style/admin.css";

const AdminNav = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="slim-navbar mb-4 nav">
      <Container>
          <Nav className="me-auto fs-7">
            {isCandidate() && (
              <>
                <Nav.Link href="/admin" className="text-light">
                  Admin
                </Nav.Link>
                <Nav.Link href="/admin/checkAccountTypes" className="text-light">
                  Account Types
                </Nav.Link>
                <Nav.Link href="/admin/checkUsers" className="text-light">
                  Users
                </Nav.Link>
                <Nav.Link href="/admin/checkJobPosts" className="text-light">
                    Job Posts
                </Nav.Link>
              </>
            )}
          </Nav>
      </Container>
    </Navbar>
  );
};

export default AdminNav;
