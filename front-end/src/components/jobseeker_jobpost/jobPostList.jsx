import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Form,
  Dropdown,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { FETCH_ALL_JOB_POSTS } from "../graphqlQueries";
import QueryResult from "../queryResult";

const JS_JobPostList = () => {
  const navigate = useNavigate();
  const [allJobPosts, setallJobPosts] = useState([]);
  const [filteredJobPosts, setFilteredJobPosts] = useState([]);
  const [location, setLocation] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [searchString, setSearchString] = useState("");

  const handleSetallJobPosts = (data) => {
    console.log("data", data);
    setallJobPosts(data.allJobPosts);
    setFilteredJobPosts(data.allJobPosts);
  };

  const { loading, error, data } = useQuery(FETCH_ALL_JOB_POSTS, {
    onCompleted: handleSetallJobPosts,
  });

  const resetFilter = () => {
    setLocation("");
    setEmploymentType("");
    setSearchString("");
    setFilteredJobPosts(allJobPosts);
  };

  const applyFilter = () => {
    let filteredData = allJobPosts;
    if (location !== "") {
      filteredData = filteredData.filter((job) => job.location === location);
    }
    if (employmentType !== "") {
      filteredData = filteredData.filter(
        (job) => job.employmentType === employmentType
      );
    }
    setFilteredJobPosts(filteredData);
  };

  const handleSearch = () => {
    let filteredData = allJobPosts;
    if (searchString !== "") {
      filteredData = filteredData.filter((job) =>
        job.title.toLowerCase().includes(searchString.toLowerCase())
      );
    }
    setFilteredJobPosts(filteredData);
  };

  return (
    <QueryResult error={error} loading={loading} data={data}>
      {data && data.allJobPosts && (
        <Container
          fluid
          className="mt-2 p-2"
          style={{ backgroundColor: "#ffffff" }}
        >
          <Row>
            <Col>
              <h1 className="text-center my-4">Featured Jobs</h1>
            </Col>
          </Row>
          <Form className="my-4">
            <Row className="align-items-end justify-content-center">
              <Col md={6}>
                <Form.Control
                  type="text"
                  value={searchString}
                  onChange={(event) => setSearchString(event.target.value)}
                  placeholder="Job title, keywords, or company name"
                />
              </Col>
              <Col md={2}>
                <Button variant="primary" onClick={handleSearch}>
                  Find Jobs
                </Button>
              </Col>
            </Row>
          </Form>

          <Form className="mb-4">
            <Row className="align-items-end justify-content-center">
              <Col md={2}>
                <Form.Group controlId="formLocation">
                  <Form.Label>Location Type:</Form.Label>
                  <Dropdown>
                    <Dropdown.Toggle
                      split
                      variant="secondary"
                      className="w-100 form-control"
                      id="dropdown-split-basic"
                    >
                      {location}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => setLocation("Remote")}>
                        Remote
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => setLocation("Hybrid")}>
                        Hybrid
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => setLocation("On-site")}>
                        On-site
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Form.Group>
              </Col>
              <Col md={2}>
                <Form.Group controlId="formEmploymentType">
                  <Form.Label>Employment Type:</Form.Label>
                  <Dropdown>
                    <Dropdown.Toggle
                      split
                      variant="secondary"
                      className="w-100 form-control"
                      id="dropdown-split-basic"
                    >
                      {employmentType}
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="w-100">
                      <Dropdown.Item
                        onClick={() => setEmploymentType("Contract")}
                      >
                        Contract
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => setEmploymentType("Full-time")}
                      >
                        Full-time
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => setEmploymentType("Part-time")}
                      >
                        Part-time
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Form.Group>
              </Col>
              <Col md={2}>
                <Button
                  variant="primary"
                  onClick={applyFilter}
                  className="w-100"
                >
                  Apply Filter
                </Button>
              </Col>
              <Col md={2}>
                <Button
                  variant="primary"
                  onClick={resetFilter}
                  className="w-100"
                >
                  Reset
                </Button>
              </Col>
            </Row>
          </Form>
          {filteredJobPosts.length === 0 ? (
            <div>
              <h3>No Job Posts</h3>
            </div>
          ) : (
            <Row md={2} lg={4} className="g-4">
              {filteredJobPosts.map((job) => (
                <Col key={job._id}>
                  <Card>
                    <Card.Body>
                      <Card.Title>{job.title}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        {job.location} | {job.employmentType}
                      </Card.Subtitle>
                      <Card.Text>{job.description && job.description.length > 100 ? job.description.substring(0,100) + ' ...' : job.description}</Card.Text>
                      <Button
                        variant="primary"
                        onClick={() => {
                          navigate(`/jobposts/${job._id}`);
                        }}
                        className="m-1"
                      >
                        View Job
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Container>
      )}
    </QueryResult>
  );
};

export default JS_JobPostList;
