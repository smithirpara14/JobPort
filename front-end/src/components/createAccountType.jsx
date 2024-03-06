import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const CREATE_ACCOUNT_TYPE = gql`
  mutation CreateAccountType($name: String!, $description: String!) {
    createAccountType(name: $name, description: $description) {
      _id
      name
      description
    }
  }
`;

const CreateAccountType = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [createAccountType] = useMutation(CREATE_ACCOUNT_TYPE);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createAccountType({ variables: { name, description } });
      navigate("/admin");
      // TODO: refresh admin page when redirected cause list is not updated.
    } catch (error) {
      console.error("Error creating account type:", error);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <div className="p-4" style={{ backgroundColor: "#f0f0f0" }}>
            <h1 className="text-center">Create Account Type</h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="name">
                <Form.Label>Name:</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="description">
                <Form.Label>Description:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Create Account Type
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateAccountType;
