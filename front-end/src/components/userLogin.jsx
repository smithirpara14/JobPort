// LoginForm.js

import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username.trim() !== "" && password.trim() !== "") {
      setLoggedIn(true);
      setUsername("");
      setPassword("");
    } else {
      alert("Please enter username and password");
    }
  };

  return (
    <Container className="mt-5 p-4" style={{ backgroundColor: "#f0f0f0" }}>
      {loggedIn ? (
        <div>
          <h2>Welcome, {username}!</h2>
          <Button variant="primary" onClick={() => setLoggedIn(false)}>
            Logout
          </Button>
        </div>
      ) : (
        <Row>
          <Col md={6} className="left-section">
            <img src="images/login.jpg" alt="Login" className="img-fluid" />
          </Col>
          <Col md={6} className="right-section d-flex align-items-center">
            <Form onSubmit={handleSubmit} className="w-100">
              <Form.Group controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  placeholder="Enter your username"
                />
              </Form.Group>
              <Form.Group controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                className="w-100 mt-3"
                style={{ backgroundColor: "#6A00C9" }}
              >
                Login
              </Button>
              <Form.Text className="text-muted m-5">
                <a href="/forgot-password">Forgot Password?</a>
              </Form.Text>
              <Form.Text className="text-muted m-5">
                <a href="/register">Register with Us</a>
              </Form.Text>
            </Form>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default LoginForm;
