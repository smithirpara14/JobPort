import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Dropdown } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "./graphqlQueries";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [accountType, setAccountType] = useState("Job Seeker");

  const [createUser] = useMutation(CREATE_USER);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Front-end validation
    if (!firstName || !lastName || !email || !password || !birthDate) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const { data } = await createUser({
        variables: {
          userInput: {
            firstName,
            lastName,
            email,
            password,
            birthDate,
            accountType,
          },
        },
      });
      console.log("User created:", data.createUser);
      navigate("/login");
    } catch (error) {
      console.error("Error creating user:", error);
      if (error.message.includes("GraphQL error")) {
        const errorMessage = error.message.replace("GraphQL error: ", "");
        alert(errorMessage);
      } else {
        alert("An error occurred while registering. Please try again later.");
      }
    }
  };

  return (
    <Container className="mt-5 p-5" style={{ backgroundColor: "#f0f0f0" }}>
      <Row>
        <Col md={6} className="left-section align-self-center">
          <img src="images/login.jpg" alt="Login" className="img-fluid" />
        </Col>
        <Col md={6} className="right-section align-self-center p-4">
          <Form onSubmit={handleSubmit} className="w-100">
            <Row>
              <Col md={6}>
                <Form.Group controlId="formFirstName">
                  <Form.Label>First Name:</Form.Label>
                  <Form.Control
                    type="text"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                    placeholder="Enter your first name"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formLastName">
                  <Form.Label>Last Name:</Form.Label>
                  <Form.Control
                    type="text"
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                    placeholder="Enter your last name"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group controlId="formEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email"
                required
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                required
              />
            </Form.Group>
            <Row>
              <Col md={6}>
                <Form.Group controlId="formBirthDate">
                  <Form.Label>Birth Date:</Form.Label>
                  <Form.Control
                    type="date"
                    value={birthDate}
                    onChange={(event) => setBirthDate(event.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formAccountType">
                  <Form.Label>Account Type:</Form.Label>
                  <Dropdown>
                    <Dropdown.Toggle split
                      variant="secondary"
                      className="w-100 form-control"
                      id="dropdown-split-basic"
                    >
                      {accountType === "Job Seeker" ? "Job Seeker" : "Employer"}
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="w-100">
                      <Dropdown.Item onClick={() => setAccountType("Job Seeker")}>
                        Job Seeker
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => setAccountType("Employer")}>
                        Employer
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Form.Group>
              </Col>
            </Row>
            <div className="text-center">
            <Button
                variant="primary"
                type="submit"
                className="w-50 mt-5 jp-bg-primary m-auto"
              >
                Register
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterForm;
