import React, { useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useQuery, useMutation } from "@apollo/client";
import { FETCH_JOB_POST, SAVE_JOB } from "../graphqlQueries";
import { useParams } from "react-router-dom";
import QueryResult from "../queryResult";
import { getUserEmail } from "../../controllers/auth";
import { dateFormatted } from "../../controllers/helper";
import "bootstrap/dist/css/bootstrap.min.css";

const JS_ViewJobPost = () => {
  const { id } = useParams();
  const userEmail = getUserEmail();
  const [jobPost, setJobPost] = useState({});
  const [isSaved, setIsSaved] = useState(false); // State to track if job is saved
  const [saveJob] = useMutation(SAVE_JOB);

  const { loading, error, data } = useQuery(FETCH_JOB_POST, {
    variables: { jobPostId: id },
    onCompleted: (data) => { setJobPost(data.jobPost); }
  });

  const handleSaveJob = async () => {
    setIsSaved(true);
    try {
      await saveJob({ variables: { email: userEmail, jobPostId: id } });
      console.log('Job saved: '+ userEmail);
      console.log(data);
    } catch (error) {
      console.error("Error saving job:", error);
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
                  <Button variant="primary" onClick={() => { console.log('apply now')}} className="m-1">Apply now</Button>
                  <Button variant="primary" onClick={handleSaveJob} className="m-1" disabled={isSaved}>{isSaved ? "Saved" : "Save for later"}</Button>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </QueryResult>
  );
};

export default JS_ViewJobPost;
