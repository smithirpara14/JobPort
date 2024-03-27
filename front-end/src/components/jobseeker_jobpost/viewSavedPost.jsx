import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { getUserEmail } from "../../controllers/auth";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FETCH_SAVED_POSTS_BY_EMAIL, REMOVE_SAVED_JOB } from "../graphqlQueries";
import { useApolloClient } from '@apollo/client';

const ViewSavedPost = () => {
  const userEmail = getUserEmail();
  const { loading, error, data } = useQuery(FETCH_SAVED_POSTS_BY_EMAIL, {
    variables: { email: userEmail },
  });

  const [removeSavedJob] = useMutation(REMOVE_SAVED_JOB);
  const client = useApolloClient();

  const handleApplyNow = () => {
    console.log('apply now');
  };

  const handleRemove = async (savedJobId) => {
    try {
      await removeSavedJob({ variables: { savedJobId } });
  
      const newData = data.savedJobsByEmail.filter(savedPost => savedPost._id !== savedJobId);
      client.writeQuery({
        query: FETCH_SAVED_POSTS_BY_EMAIL,
        variables: { email: userEmail },
        data: { savedJobsByEmail: newData },
      });
    } catch (error) {
      console.error("Error removing saved job:", error);
    }
  };

  return (
    <Container className="mt-5">
      <h1>Saved Job Posts</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && data.savedJobsByEmail && data.savedJobsByEmail.length > 0 ? (
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
                  <Button variant="danger" onClick={() => handleRemove(savedPost._id)} className="m-1">Remove</Button>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <Card className="mt-3">
          <Card.Body>
            <Card.Text>No saved job posts yet.</Card.Text>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default ViewSavedPost;
