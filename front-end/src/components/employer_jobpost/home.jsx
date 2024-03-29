import React, {useState} from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import SummaryCard from "../helper/summaryCard";
import { useQuery } from "@apollo/client";
import { FETCH_RECRUITER_SUMMARY } from "../graphqlQueries";
import QueryResult from "../queryResult";
import { getUserEmail } from "../../controllers/auth";
const EMP_Home = () => {
    
/*totalJobPosts
      totalApplications
      activeJobPosts
      closedJobPosts
      todayJobPosts
      todayApplications*/
    const [summaryData, setSummaryData] = useState({});
    
    const { loading, error, data } = useQuery(FETCH_RECRUITER_SUMMARY, {
        variables: { userId: getUserEmail() },
        onCompleted: (data) => {
            //console.log("data", data);
            setSummaryData(data.recruiterSummary);
        },
      });


    return (
        <QueryResult error={error} loading={loading} data={data}>
            <Container fluid className="mt-2">
                <Row className="mt-3">
                    <Col lg={4} md={6} sm={12}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Total Job Posts</Card.Title>
                                <Card.Text>
                                <SummaryCard title="" value={summaryData.totalJobPosts} total={summaryData.totalJobPosts} />
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={4} md={6} sm={12}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Total Active Posts</Card.Title>
                                <Card.Text>
                                <SummaryCard title="" value={summaryData.activeJobPosts} total={summaryData.totalJobPosts} />
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={4} md={6} sm={12}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Total Closed Posts</Card.Title>
                                <Card.Text>
                                <SummaryCard title="" value={summaryData.closedJobPosts} total={summaryData.totalJobPosts} />
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col lg={4} md={6} sm={12}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Today's Job Posts</Card.Title>
                                <Card.Text>
                                <SummaryCard title="" value={summaryData.todayJobPosts} total={summaryData.totalJobPosts} />
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={4} md={6} sm={12}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Total Applications</Card.Title>
                                <Card.Text>
                                <SummaryCard title="" value={summaryData.totalApplications} total={summaryData.totalApplications} />
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={4} md={6} sm={12}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Today's Applications</Card.Title>
                                <Card.Text>
                                <SummaryCard title="" value={summaryData.todayApplications} total={summaryData.todayApplications} />
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </QueryResult>
    );
};

export default EMP_Home;
