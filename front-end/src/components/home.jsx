import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// import JobPostList from "./employer_jobpost/jobPostList";
import { Feather2 } from "react-bootstrap-icons";
import JS_JobPostList from "./jobseeker_jobpost/jobPostList";
import { Link } from "react-router-dom";
import { isAuthenticated, isCandidate, isEmployer } from "../controllers/auth";

const Home = () => {
  return (
    <Container fluid className="">
      {/* Header Section */}
      <Row>
        <Col>
          <h1 className="text-center mt-4">Welcome to Job Portal</h1>
          <p className="text-center">
            Find the perfect job that matches your skills and interests.
          </p>
        </Col>
      </Row>

      {/* Image and Content Section */}
      <Row className="mt-4 mx-0">
        <Col md={5}>
          <img
            src="images/MainImage.jpg"
            alt="Banner"
            className="img-fluid"
            style={{ borderRadius: "10px" }}
          />
        </Col>
        <Col md={6} className="my-auto">
          <div>
            <h2 className="mb-3">Explore Exciting Opportunities</h2>
            <p className="text-lg">
              Begin your journey towards a fulfilling career by exploring a
              diverse range of job opportunities tailored to your skills and
              career aspirations. Whether you're an experienced professional
              seeking new challenges or a recent graduate embarking on your
              career path, JobPort offers a platform to discover and apply for
              exciting roles across various industries.
            </p>
            <p className="text-lg">
              Our curated collection of job listings ensures that you have
              access to high-quality opportunities from reputable organizations.
              Explore job postings that match your expertise, interests, and
              preferences, and take the next step towards advancing your career.
            </p>
            {isAuthenticated() && isCandidate() && (
              <Link to="/jobposts">
                <Button variant="primary">View Jobs</Button>
              </Link>
            )}
            {isAuthenticated() && isEmployer() && (
              <Link to="/recruiter/jobposts">
                <Button variant="primary">View Jobs</Button>
              </Link>
            )}
          </div>
        </Col>
      </Row>

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
      {isAuthenticated() && isCandidate() && (
        <JS_JobPostList />
      )}
    </Container>
  );
};

export default Home;
