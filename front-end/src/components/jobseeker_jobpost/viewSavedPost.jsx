import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { getUserEmail } from "../../controllers/auth";
import { Container, Row, Col, Card, Button, Tabs, Tab } from "react-bootstrap";
import { FETCH_SAVED_APPLIED_JOBS, REMOVE_SAVED_JOB , APPLY_JOB} from "../graphqlQueries";

const ViewSavedPost = () => {
  const userEmail = getUserEmail();
  const { loading, error, data, refetch } = useQuery(FETCH_SAVED_APPLIED_JOBS, {
    variables: { userId: userEmail },
  });

  const [removeSavedJob] = useMutation(REMOVE_SAVED_JOB);
  const [applyJob] = useMutation(APPLY_JOB);

  const handleApplyNow = async (savedJobId) => {
    try {
      await applyJob({ variables: { userId: userEmail, jobPostId: savedJobId } });
      refetch();
    } catch (error) {
      console.error("Error applying job:", error);
    }
  };

  const handleRemove = async (savedJobId) => {
    try {
      await removeSavedJob({ variables: { savedJobId } });
      refetch();
    } catch (error) {
      console.error("Error removing saved job:", error);
    }
  };

  return (
    <Container className="mt-5">
      <h1>Your Jobs</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <Tabs defaultActiveKey="saved" id="uncontrolled-tab-example" className="mb-3">
        <Tab eventKey="saved" title="Saved Jobs">
        {data && data.savedAppliedJobsByUser && data.savedAppliedJobsByUser.savedJobs.length > 0 ? (
        <Row xs={1} md={2} className="g-4">
          {data.savedAppliedJobsByUser.savedJobs.map(savedPost => (
            <Col key={savedPost._id} lg={4}>
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
                  <Button variant="primary" onClick={() => handleApplyNow(savedPost.job._id) } className="m-1">Apply now</Button>
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
        </Tab>
        <Tab eventKey="applied" title="Applied Jobs">
        {data && data.savedAppliedJobsByUser && data.savedAppliedJobsByUser.appliedJobs.length > 0 ? (
        <Row xs={1} md={2} className="g-4">
          {data.savedAppliedJobsByUser.appliedJobs.map(savedPost => (
            <Col key={savedPost._id} lg={4}>
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
                  <Button variant="primary" className="m-1" disabled>Applied</Button>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <Card className="mt-3">
          <Card.Body>
            <Card.Text>Start applying on jobs.</Card.Text>
          </Card.Body>
        </Card>
      )}
        </Tab>
      </Tabs>

    </Container>
  );
};

export default ViewSavedPost;
