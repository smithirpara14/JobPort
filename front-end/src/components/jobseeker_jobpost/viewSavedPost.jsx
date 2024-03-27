import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { getUserEmail } from "../../controllers/auth";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FETCH_SAVED_POSTS_BY_EMAIL } from "../graphqlQueries";

const ViewSavedPost = () => {
  const userEmail = getUserEmail();
  const { loading, error, data } = useQuery(FETCH_SAVED_POSTS_BY_EMAIL, {
    variables: { email: userEmail },
  });

  const handleApplyNow = () => {
    // Add your logic for handling the "Apply now" button click here
    console.log('apply now');
  };

  const handleSaveForLater = () => {
    // Add your logic for handling the "Save for later" button click here
    console.log('save for later');
  };

  return (
    <Container className="mt-5">
      <h1>Saved Job Posts</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && data.savedJobsByEmail && (
        <Row xs={1} md={2} className="g-4">
          {data.savedJobsByEmail.map(savedPost => (
            <Col key={savedPost._id}>
              <Card>
                <Card.Body>
                  <Card.Title>{savedPost.job.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {savedPost.job.location} | {savedPost.job.employmentType}
                  </Card.Subtitle>
                  <Card.Text>
                    <strong>Description:</strong> {savedPost.job.description}
                  </Card.Text>
                  <Card.Text>
                    <strong>Experience Level:</strong> {savedPost.job.experienceLevel}
                  </Card.Text>
                  <Card.Text>
                    <strong>Salary Range:</strong> {savedPost.job.salaryRange}
                  </Card.Text>
                  <Card.Text>
                    <strong>Closing Date:</strong> {savedPost.job.closingDate}
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Button variant="primary" onClick={handleApplyNow} className="m-1">Apply now</Button>
                  {/*<Button variant="primary" onClick={handleSaveForLater} className="m-1">Save for later</Button>*/}
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default ViewSavedPost;
