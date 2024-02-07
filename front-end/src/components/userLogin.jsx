// LoginForm.js

import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const LoginForm = () => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email.trim().length === 0 && password.trim().length === 0) {
      setError("Please enter valid email and password");
      return;
    }
    const requestBody = {
      query: `
        query {
          login(email: "${email}", password: "${password}") {
            email,
            token
          }
        }
      `,
    };
    fetch("http://localhost:3001/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "ok") {
          setLoggedIn(true);
        } else {
          setError("Invalid email or password");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <Container className="mt-5 p-4" style={{ backgroundColor: "#f0f0f0" }}>
      {loggedIn ? (
        <div>
          <h2>Welcome, {email}!</h2>
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
              {error && (
              <span className="text-danger">
                {error}
              </span>
            )}
              <Form.Group controlId="formemail">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(event) => setemail(event.target.value)}
                  placeholder="Enter your email"
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
                style={{ backgroundColor: "#3a41c6" }}
              >
                Login
              </Button>
              <Form.Text className="text-muted mt-2 mb-3">
                <a href="/forgot-password">Forgot Password?</a>
              </Form.Text>
              <Form.Text className="text-muted mb-2">
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
