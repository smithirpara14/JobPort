import React, { useState } from "react";
import { Container, Row, Col, Button, Card, Form, Dropdown } from "react-bootstrap";
import { useNavigate  } from "react-router-dom";
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
        setFilteredJobPosts(allJobPosts);
    }

    const applyFilter = () => {
        let filteredData = allJobPosts
        if(location !== ""){
            filteredData = filteredData.filter(job => job.location === location);
        }
        if(employmentType !== ""){
            filteredData = filteredData.filter(job => job.employmentType === employmentType);
        }
        setFilteredJobPosts(filteredData);
    }


  return (
    <QueryResult error={error} loading={loading} data={data}>
      {data && data.allJobPosts && (
        <Container className="mt-5 p-5" style={{ backgroundColor: "#ffffff" }}>
          <Row>
            <Col>
              <h1>Job Posts</h1>
            </Col>
          </Row>
        <Form  className="w-100 mb-4">
          <Row>
            <Col md={3}>
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
                <Dropdown.Menu className="w-100">
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
            <Col md={3}>
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
            <Col md={3}>
            </Col>
            <Col md={3} className="">
                <Button variant="primary" onClick={() => { applyFilter() }} className="m-1">Apply Filter</Button>
                <Button variant="primary" onClick={() => {resetFilter()}} className="m-1">Reset</Button>
            </Col>
          </Row>
        </Form>
          {filteredJobPosts.length === 0 ? (
            // Show no job post banner
            <div>
              <h3>No Job Posts</h3>
            </div>
          ) : (
            <Row>
              {filteredJobPosts.map((job) => (
                <Col key={job._id} md={4} className="mb-4">
                  <Card>
                    <Card.Body>
                      <Card.Title>{job.title}</Card.Title>
                      <Card.Text>{job.description}</Card.Text>
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
