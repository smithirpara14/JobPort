import React, { useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

const GET_ACCOUNT_TYPES = gql`
  query {
    accountTypes {
      _id
      name
      description
    }
  }
`;

const CREATE_USER = gql`
  mutation CreateUser($input: UserInput!) {
    createUser(userInput: $input) {
      _id
      firstName
      lastName
      email
    }
  }
`;

const CreateUser = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountTypeId, setAccountTypeId] = useState("");

  const { loading, error, data } = useQuery(GET_ACCOUNT_TYPES);
  const [createUser] = useMutation(CREATE_USER);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser({
        variables: {
          input: {
            firstName,
            lastName,
            email,
            password,
            accountType: accountTypeId,
          },
        },
      });
      navigate("/admin"); // Redirect to admin page after successful creation
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <div className="p-4" style={{ backgroundColor: "#f0f0f0" }}>
            <h1 className="text-center">Create User</h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="firstName">
                <Form.Label>First Name:</Form.Label>
                <Form.Control
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="lastName">
                <Form.Label>Last Name:</Form.Label>
                <Form.Control
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="accountType">
                <Form.Label>Account Type:</Form.Label>
                <Form.Control
                  as="select"
                  value={accountTypeId}
                  onChange={(e) => setAccountTypeId(e.target.value)}
                  required
                >
                  <option value="">Select Account Type</option>
                  {data.accountTypes.map((accountType) => (
                    <option key={accountType._id} value={accountType._id}>
                      {accountType.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Create User
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateUser;
