import React, { useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import SummaryCard from "../helper/summaryCard";
import { useQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import { FETCH_RECRUITER_SUMMARY } from "../graphqlQueries";
import QueryResult from "../queryResult";
import { getUserEmail } from "../../controllers/auth";
import EMP_JobPostList from "./jobPostList";

const EMP_Home = () => {
  const [summaryData, setSummaryData] = useState({});

  const { loading, error, data } = useQuery(FETCH_RECRUITER_SUMMARY, {
    variables: { userId: getUserEmail() },
    onCompleted: (data) => {
      setSummaryData(data.recruiterSummary);
    },
  });

  return (
    <QueryResult error={error} loading={loading} data={data}>
      <Container fluid className="mt-4">
        {/* Hero Section */}
        <Row className="mb-5">
          <Col className="text-center mt-2">
            <h2>Welcome to Your Recruiter Dashboard</h2>
            <p>Explore your job posts, manage applicants, and gain insights.</p>
            <div className="d-inline-block mx-2">
              <Button variant="primary" href="/recruiter/jobposts/create">
                Create New Job
              </Button>
            </div>
            <div className="d-inline-block mx-2">
              <Button variant="info" href="/recruiter/jobposts">
                Manage Applicants
              </Button>
            </div>
          </Col>
        </Row>

        {/* Summary Section */}
        <Col>
          <h3 className="text-center mb-4">Summary</h3>
        </Col>
        <Row className="justify-content-center mb-5">
          <Col lg={4} md={6} sm={12}>
            <Card className="text-center">
              <Card.Body>
                <Card.Title>Total Job Posts</Card.Title>
                <SummaryCard
                  title=""
                  value={summaryData.totalJobPosts}
                  total={summaryData.totalJobPosts}
                />
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4} md={6} sm={12}>
            <Card className="text-center">
              <Card.Body>
                <Card.Title>Total Active Posts</Card.Title>
                <SummaryCard
                  title=""
                  value={summaryData.activeJobPosts}
                  total={summaryData.totalJobPosts}
                />
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4} md={6} sm={12}>
            <Card className="text-center">
              <Card.Body>
                <Card.Title>Total Closed Posts</Card.Title>
                <SummaryCard
                  title=""
                  value={summaryData.closedJobPosts}
                  total={summaryData.totalJobPosts}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Recent Job Posts Section */}
        <Row>
          <Col>
            <h3 className="text-center">Recent Job Posts</h3>
            <EMP_JobPostList />
          </Col>
        </Row>
        <Row className="justify-content-center">
          {data &&
            data.recentJobPosts &&
            data.recentJobPosts.map((job) => (
              <Col key={job._id} md={4} className="mb-4">
                <Card>
                  <Card.Body>
                    <Card.Title>{job.title}</Card.Title>
                    <Card.Text>{job.description}</Card.Text>
                    <Button variant="primary" block>
                      View Details
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
      </Container>
    </QueryResult>
  );
};

export default EMP_Home;
