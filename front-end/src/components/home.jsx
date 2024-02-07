import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  return (
    <Container>
      {/* Header Section */}
      <Row className="mt-4">
        <Col>
          <h1>Welcome to Job Portal</h1>
          <p>Find the perfect job that matches your skills and interests.</p>
        </Col>
      </Row>

      {/* Job Listings Section */}
      <Row className="mt-4">
        <Col>
          <h2>Featured Jobs</h2>
        </Col>
      </Row>

      <Row>
        {/* Job Listing 1 */}
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Job Title 1</Card.Title>
              <Card.Text>
                Short description of the job. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit.
              </Card.Text>
              <Button variant="primary">Read More</Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Job Listing 2 */}
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Job Title 2</Card.Title>
              <Card.Text>
                Short description of the job. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit.
              </Card.Text>
              <Button variant="primary">Read More</Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Add more job listings as needed */}
      </Row>
    </Container>
  );
};

export default Home;
