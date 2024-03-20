import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// import JobPostList from "./employer_jobpost/jobPostList";
import { Feather2 } from "react-bootstrap-icons";
import JS_JobPostList from "./jobseeker_jobpost/jobPostList";
const Home = () => {
  return (
    <Container>
      {/* Header Section */}
      <Row>
        <Col>
          <h1 className="text-center ">Welcome to Job Portal</h1>
          <p className="text-center">
            Find the perfect job that matches your skills and interests.
          </p>
        </Col>
      </Row>

      {/* Image and Content Section */}
      <Row className="mt-4">
        <Col md={6}>
          {/* Add your image component or element here */}
          <img src="images/MainImage.jpg" alt="Banner" className="img-fluid" />
        </Col>
        <Col md={6} className="my-auto">
          <h2>Explore Exciting Opportunities</h2>
          <p>
            Discover a wide range of job opportunities that suit your skills and
            career goals.
          </p>
          <Button variant="primary">View Jobs</Button>
        </Col>
      </Row>

      {/* Job Listings Section */}
      {/* <Row className="mt-4">
        <Col>
          <h2 className="text-center my-4">Featured Jobs</h2>
        </Col>
      </Row> */}

      {/* Job Listings */}
      {/* <Row>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((jobId) => (
          <Col key={jobId} md={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>Job Title {jobId}</Card.Title>
                <Card.Text>
                  Short description of the job. Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit.
                </Card.Text>
                <Button variant="primary">Read More</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row> */}
      <JS_JobPostList />
    </Container>
  );
};

export default Home;
