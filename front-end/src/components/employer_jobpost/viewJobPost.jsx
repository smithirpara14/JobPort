import React, { useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useQuery, useMutation } from "@apollo/client";
import { FETCH_JOB_POSTS, FETCH_JOB_POST, DELETE_JOB_POST } from "../graphqlQueries";
import { useNavigate, useParams } from "react-router-dom";
import QueryResult from "../queryResult";
import { dateFormatted } from "../../controllers/helper";
import "bootstrap/dist/css/bootstrap.min.css";

const ViewJobPost = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [jobPost, setJobPost] = useState({});
  const [errorDelete, setErrorDelete] = useState("");
  const [deleteJobPost] = useMutation(DELETE_JOB_POST, {
    onCompleted: () => {
      navigate("/jobposts", { state: { jobDeleted: true } });
    }
  });

  const { loading, error, data } = useQuery(FETCH_JOB_POST, {
    variables: { jobPostId: id },
    onCompleted: (data) => { setJobPost(data.jobPost); }
  });
  
  
  const handleDelete = async (event) => {
    if (window.confirm("Are you sure you want to delete this job post?")) {
      try {
        const result = await deleteJobPost({ variables: { jobPostId: id } });

      } catch (error) {
        console.error("Error creating job:", error);
        setErrorDelete("Something went wrong. Please try again later.");
      }
    }
  };

  

  return (
    
    <QueryResult error={error} loading={loading} data={data}>
    {data && data.jobPost && (
      <Container className="mt-5">
      <Row>
        <Col md={8} className="mx-auto">
          <Card>
              <Card.Body>
              {errorDelete && <span className="text-danger">{errorDelete}</span>}
              <Card.Title>{jobPost.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {jobPost.location} | {jobPost.employmentType}
              </Card.Subtitle>
              <Card.Text>
                <strong>Description:</strong> {jobPost.description}
              </Card.Text>
              <Card.Text>
                <strong>Experience Level:</strong> {jobPost.experienceLevel}
              </Card.Text>
              <Card.Text>
                <strong>Salary Range:</strong> {jobPost.salaryRange}
              </Card.Text>
              <Card.Text>
                <strong>Closing Date:</strong> {dateFormatted(jobPost.closingDate)}
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <Button variant="warning" onClick={() => { navigate(`/jobposts/edit/${id}`)}} className="m-1">Edit</Button>
              <Button variant="danger" onClick={() => { handleDelete() }} className="m-1">Delete</Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
    )}
</QueryResult>
  );
};

export default ViewJobPost;
