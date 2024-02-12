import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Dropdown } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "./graphqlQueries";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { validateName, validateEmail, validatePassword } from "../controllers/helper";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [accountType, setAccountType] = useState("Job Seeker");
  const [error, setError] = useState("");
  const [errorFirstName, setErrorFirstName] = useState("");
  const [errorLastName, setErrorLastName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorBirthDate, setErrorBirthDate] = useState("");
  const [errorAccountType, setErrorAccountType] = useState("");

  const [createUser] = useMutation(CREATE_USER);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let hasError = false;
    // Validate First Name
    if (firstName.trim().length === 0) {
      setErrorFirstName("First name is required");
      hasError = true;
    } else if (!validateName(firstName)) {
      setErrorFirstName("First name is invalid");
      hasError = true;
    } else {
      setErrorFirstName("");
    }
    // Validate Last Name
    if (lastName.trim().length === 0) { 
      setErrorLastName("Last name is required");
      hasError = true;
    } else if (!validateName(lastName)) {
      setErrorLastName("Last name is invalid");
      hasError = true;
    } else {
      setErrorLastName("");
    }
    // Validate Email
    if (email.trim().length === 0) {
      setErrorEmail("Email is required");
      hasError = true;
    } else if (!validateEmail(email)) {
      setErrorEmail("Email is invalid");
      hasError = true;
    } else {
      setErrorEmail("");
    }
    // Validate Password
    if (password.trim().length === 0) {
      setErrorPassword("Password is required");
      hasError = true;
    } else if (!validatePassword(password)) {
      setErrorPassword("A minimum of eight characters, at least one letter and one number is required");
      hasError = true;
    } else {
      setErrorPassword("");
    }
    // Validate Birth Date
    if (birthDate.trim().length === 0) {
      setErrorBirthDate("Birth date is required");
      hasError = true;
    } else {
      setErrorBirthDate("");
    }
    // Validate Account Type
    if (accountType.trim().length === 0) {
      setErrorAccountType("Account type is required");
      hasError = true;
    } else {
      setErrorAccountType("");
    }
    // If there is an error, do not proceed
    if (hasError) {
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
      //console.log("User created:", data.createUser);
      navigate(
        '/login',{
        state: { registrationSuccess: 'You have been successfully registered. Please log in.' }
      });
    } catch (error) {
      console.error("Error creating user:", error.message);
      if (error.message.includes("GraphQL error")) {
        //const errorMessage = error.message.replace("GraphQL error: ", "");
        setError("Something went wrong. Please try again later.");
      } else {
        setError(error.message);
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
            {error && (
              <span className="text-danger">
                {error}
              </span>
            )}
            <Row>
              <Col md={6}>
                <Form.Group controlId="formFirstName">
                  <Form.Label>First Name:</Form.Label>
                  <Form.Control
                    type="text"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                    placeholder="Enter your first name"
                    
                  />
                </Form.Group>
                {errorFirstName && (
                  <span className="text-danger">
                    {errorFirstName}
                  </span>
                )}
              </Col>
              <Col md={6}>
                <Form.Group controlId="formLastName">
                  <Form.Label>Last Name:</Form.Label>
                  <Form.Control
                    type="text"
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                    placeholder="Enter your last name"
                  />
                </Form.Group>
                {errorLastName && (
                  <span className="text-danger">
                    {errorLastName}
                  </span>
                )}
              </Col>
            </Row>
            <Form.Group controlId="formEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="text"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email"
              />
              {errorEmail && (
                <span className="text-danger">
                  {errorEmail}
                </span>
              )}
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                
              />
              {errorPassword && (
                <span className="text-danger">
                  {errorPassword}
                </span>
              )}
            </Form.Group>
            <Row>
              <Col md={6}>
                <Form.Group controlId="formBirthDate">
                  <Form.Label>Birth Date:</Form.Label>
                  <Form.Control
                    type="date"
                    value={birthDate}
                    onChange={(event) => setBirthDate(event.target.value)}
                    
                  />
                </Form.Group>
                {errorBirthDate && (
                  <span className="text-danger">
                    {errorBirthDate}
                  </span>
                )}
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
                {errorAccountType && (
                  <span className="text-danger">
                    {errorAccountType}
                  </span>
                )}
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
