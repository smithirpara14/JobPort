import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminNav from "./Admin/adminNav";

const AdminPage = () => {
  return (
    <>
      <AdminNav />
      <Container>
        <h2>Welcome Back, Admin!</h2>
      </Container>
    </>
  );
};

export default AdminPage;
