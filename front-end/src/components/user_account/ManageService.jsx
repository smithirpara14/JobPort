import { Container, Card, Button } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import { FETCH_SUBSCRIPTION, CANCEL_SUBSCRIPTION } from '../graphqlQueries';
import { getUserEmail } from '../../controllers/auth';
import { useState } from 'react';
import QueryResult from '../queryResult';
import { dateFormatted } from '../../controllers/helper';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const ManageService = () => {
    const location = useLocation();
    const userEmail = getUserEmail();
    const [isActive, setIsActive] = useState(false);
    const [plan, setPlan] = useState('Basic');
    const [cancelSubscription] = useMutation(CANCEL_SUBSCRIPTION);

    const { loading, error, data, refetch } = useQuery(FETCH_SUBSCRIPTION, {
        variables: { userId: userEmail }, onCompleted: (data) => {
            console.log("Subscription data: ", data);
            if (data.getSubscription.status === 'active') {
                setIsActive(true);
            }
            if (data.getSubscription.subscriptionType === 'Monthly') {
                setPlan('Premium Monthly');
            }
            else if (data.getSubscription.subscriptionType === '6Months') {
                setPlan('Premium 6 Months');
            }
            else if (data.getSubscription.subscriptionType === 'Yearly') {
                setPlan('Premium Yearly');
            }
        }
    });    

    const cancelPlan = async () => {
        try {
            const response = await cancelSubscription({
                variables: {
                    userId: userEmail
                }
            });
            console.log('Response:', response);
            refetch();
        }
        catch (error) {
            console.error('Error cancelling subscription:', error);
        }
    }

    useEffect(() => {
        if (location.state && location.state.subscribed) {
            refetch();
        }
    });

    return (
        <QueryResult error={error} loading={loading} data={data}>
            <Container>
                <h3>Manage your subscription</h3>
                {
                    data && data.getSubscription && data.getSubscription.stripeId ? (
                        <>
                            <Card>
                            <Card.Header>
                                <h5>Subscription Details</h5>
                            </Card.Header>
                            <Card.Body>
                                    <Card.Text>Current Plan: {plan}</Card.Text>
                                    
                                    {isActive ? (
                                        <>
                                            <Card.Text>Status: Active</Card.Text>
                                            <Card.Text>Next Payment Date: {dateFormatted(data.getSubscription.nextPaymentDate)}</Card.Text>
                                            <Card.Text>Next Payment Amount: ${data.getSubscription.nextPaymentAmount}</Card.Text>
                                        </>
                                    ) : (
                                        <>
                                            <Card.Text>Status: {data.getSubscription.status}</Card.Text>
                                        </>
                                    )}    
                                </Card.Body>
                                <Card.Footer>
                                    {isActive ? (
                                        <>
                                            <Button variant="danger" onClick={cancelPlan}>Cancel Subscription</Button>
                                        </>
                                    ): (
                                        <>
                                            <Link to="/subscribe">
                                                <Button variant="primary">Renew Subscription</Button>
                                            </Link>
                                        </>
                                    )}
                                </Card.Footer>
                            </Card>
                        </>
                    ) : (
                    <>
                                <h5>Subscribe to our permium service right now!</h5>
                                {/* navigate to SubscribeService */}
                                <Link to="/subscribe">
                                    <Button variant="primary">Subscribe Now</Button>
                                </Link>
                    </>
                    )
                }
            </Container>
        </QueryResult>
    );
}

export default ManageService;
