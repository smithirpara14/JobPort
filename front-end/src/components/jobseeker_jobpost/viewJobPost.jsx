import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useQuery, useMutation } from "@apollo/client";
import { FETCH_JOB_POST_APPLICATION, SAVE_JOB, APPLY_JOB } from "../graphqlQueries";
import { useParams } from "react-router-dom";
import QueryResult from "../queryResult";
import { getUserEmail } from "../../controllers/auth";
import { dateFormatted } from "../../controllers/helper";
import "bootstrap/dist/css/bootstrap.min.css";

const JS_ViewJobPost = () => {
  const { id } = useParams();
  const userEmail = getUserEmail();
  const [jobPost, setJobPost] = useState({});
  const [isSaved, setIsSaved] = useState(false); 
  const [isApplied, setIsApplied] = useState(false);
  const [saveJob] = useMutation(SAVE_JOB);
  const [applyJob] = useMutation(APPLY_JOB);

  const { loading, error, data } = useQuery(FETCH_JOB_POST_APPLICATION, {
    variables: { jobPostId: id, userId: userEmail },
    onCompleted: (data) => {
      console.log("Data:::", data.jobPostWithApplication);
      setJobPost(data.jobPostWithApplication.jobPost);
      if (data.jobPostWithApplication.application) {
        setIsApplied(true);
      }
      if (data.jobPostWithApplication.savedJob) {
        setIsSaved(true);
      }
    }
  });

  const handleSaveJob = async () => {
    try {
      await saveJob({ variables: { email: userEmail, jobPostId: id } });
      setIsSaved(true);
    } catch (error) {
      console.error("Error saving job:", error);
    }
  };

  const handleApplyJob = async () => {
    try {
      await applyJob({ variables: { userId : userEmail, jobPostId: id } });
      setIsApplied(true);
    } catch (error) {
      console.error("Error applying job:", error);
    }
  }

  return (
    <QueryResult error={error} loading={loading} data={data}>
      {data && data.jobPostWithApplication && (
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
                    <strong>Description:</strong> {jobPost.description && jobPost.description.length > 500 ? jobPost.description.substring(0,500) + ' ... ' : jobPost.description}
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
                  <Button variant="primary" onClick={handleApplyJob} className="m-1" disabled={isApplied}>{isApplied ? "Applied" : "Apply now"}</Button>
                  {
                    isApplied ? null : <Button variant="primary" onClick={handleSaveJob} className="m-1" disabled={isSaved}>{isSaved ? "Saved" : "Save for later"}</Button>
                  }
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
