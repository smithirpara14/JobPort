import React, { useState } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { FETCH_JOB_POSTS } from "../graphqlQueries";
import QueryResult from "../queryResult";

const JobPostList = () => {

    const navigate = useNavigate();
    const [jobPosts, setJobPosts] = useState([]);

    
    const handleSetJobPosts = (data) => {
        console.log("data", data);
        setJobPosts(data.jobPosts);
    }

  const { loading, error, data } = useQuery(FETCH_JOB_POSTS, {
        variables: { userId: localStorage.getItem("userEmail") },
        onCompleted: handleSetJobPosts
    });


    
    return (
        <QueryResult error={error} loading={loading} data={data}>
            {data && data.jobPosts && (
                <Container className="mt-5 p-5" style={{ backgroundColor: "#f0f0f0" }}>
                <Row>
                  <Col md={10}>
                    <h1>Job Posts</h1>
                  </Col>
                  <Col md={2}>
                    <Button
                      variant="primary"
                      onClick={() => {
                        navigate("/jobposts/create");
                      }}
                    >
                      Create Job Post
                    </Button>
                  </Col>
                </Row>
                {jobPosts.length === 0 ? (
                  //show no job post banner
                  <div>
                    <h3>No Job Posts</h3>
                  </div>
                    ) : (
                        <Row>
                        {jobPosts.map((job) => (
                          <Col key={job._id} md={4} className="mb-4">
                            <Card>
                              <Card.Body>
                                        <Card.Title>{job.title}</Card.Title>
                                <Card.Text>
                                            { job.description}
                                </Card.Text>
                                        <Button variant="success" onClick={() => { navigate(`/jobposts/${job._id}`)}} className="m-1">View</Button>
                                        <Button variant="warning" onClick={() => { navigate(`/jobposts/edit/${job._id}`)}} className="m-1">Edit</Button>
                                        <Button variant="danger" onClick={() => { console.log('delete job: ', job._id);} } className="m-1">Delete</Button>
                              </Card.Body>
                            </Card>
                          </Col>
                        ))}
                      </Row>
                )
                }
                </Container>
            )}
        </QueryResult>
        
        
      );
}

export default JobPostList;