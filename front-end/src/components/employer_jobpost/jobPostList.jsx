import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { FETCH_JOB_POSTS } from "../graphqlQueries";
import QueryResult from "../queryResult";

const EMP_JobPostList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [jobPosts, setJobPosts] = useState([]);

  const handleSetJobPosts = (data) => {
    console.log("data", data);
    setJobPosts(data.jobPosts);
  };

  const { loading, error, data, refetch } = useQuery(FETCH_JOB_POSTS, {
    variables: { userId: localStorage.getItem("userEmail") },
    onCompleted: handleSetJobPosts,
  });

  useEffect(() => {
    if (
      location.state &&
      (location.state.jobCreated || location.state.jobDeleted)
    ) {
      refetch();
    }
  });

  return (
    <QueryResult error={error} loading={loading} data={data}>
      {data && data.jobPosts && (
        <Container className="mt-5 p-5" style={{ backgroundColor: "#ffffff" }}>
          <Row>
            <Col>
              <h1>Job Posts</h1>
            </Col>
            <Col className="text-end">
              <Button
                variant="primary"
                onClick={() => {
                  navigate("/recruiter/jobposts/create");
                }}
                className="m-1"
              >
                Create Job Post
              </Button>
            </Col>
          </Row>
          {jobPosts.length === 0 ? (
            // Show no job post banner
            <div>
              <h3>No Job Posts</h3>
            </div>
          ) : (
            <Row className="mt-5">
              {jobPosts.map((job) => (
                <Col key={job._id} md={4} className="mb-4">
                  <Card>
                    <Card.Body>
                      <Card.Title>{job.title}</Card.Title>
                      <Card.Text>{job.description.length > 100 ? job.description.substring(0,100) + ' ... ' : job.description}</Card.Text>
                      <Button
                        variant="primary"
                        onClick={() => {
                          navigate(`/recruiter/jobposts/${job._id}`);
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

export default EMP_JobPostList;
