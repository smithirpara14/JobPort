import React, { useState } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { useNavigate  } from "react-router-dom";
import { useQuery } from "@apollo/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { FETCH_ALL_JOB_POSTS } from "../graphqlQueries";
import QueryResult from "../queryResult";

const JS_JobPostList = () => {
  const navigate = useNavigate();
    const [allJobPosts, setallJobPosts] = useState([]);
    const [filteredJobPosts, setFilteredJobPosts] = useState([]);

  const handleSetallJobPosts = (data) => {
    console.log("data", data);
      setallJobPosts(data.allJobPosts);
      setFilteredJobPosts(data.allJobPosts);
  };

  const { loading, error, data } = useQuery(FETCH_ALL_JOB_POSTS, {
    onCompleted: handleSetallJobPosts,
  });

  return (
    <QueryResult error={error} loading={loading} data={data}>
      {data && data.allJobPosts && (
        <Container className="mt-5 p-5" style={{ backgroundColor: "#ffffff" }}>
          <Row>
            <Col>
              <h1>Job Posts</h1>
            </Col>
          </Row>
          {/* <Row>
            <Form>
            <Col md={3}>
            </Col>
                      
            <Col md={3}>
            </Col>
                      
            <Col md={3}>
            </Col>
            
            <Col md={2}>
            </Col>
            
            <Col md={1}>
                
            </Col>
          </Row> */}
          {allJobPosts.length === 0 ? (
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
