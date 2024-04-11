import React, { useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useQuery } from "@apollo/client";
import { FETCH_JOB_POST, FETCH_SAVED_JOBS } from "../graphqlQueries";
import { useParams } from "react-router-dom";
import QueryResult from "../queryResult";
import { dateFormatted } from "../../controllers/helper";
import "bootstrap/dist/css/bootstrap.min.css";

const JS_ViewJobPost = () => {
  const { id } = useParams();
  const [jobPost, setJobPost] = useState({});

  const { loading, error, data } = useQuery(FETCH_JOB_POST, {
    variables: { jobPostId: id },
    onCompleted: (data) => { setJobPost(data.jobPost); }
  });

  const handleSaveJob = () => {
    console.log('--------');
    console.log("save job");
    // user: 
    // sjob@gmail.com
    // Sj@1234567890

    // jobPost:
    // 6602f248336d87296f998a12
    // Sr Web developer
    console.log('--------');
  }
  
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
                    <strong>Description:</strong> {jobPost.description && jobPost.description.length > 100 ? jobPost.description.substring(0, 100) + ' ... ' : jobPost.description}
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
                  <Button variant="primary" onClick={() => { }} className="m-1">Apply now</Button>
                  <Button variant="primary" onClick={this.handleSaveJob} className="m-1">Save for later</Button>
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
