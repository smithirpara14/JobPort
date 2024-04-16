import React, { useEffect } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { useMutation} from '@apollo/client';
import { CREATE_SUBSCRIPTION } from '../graphqlQueries';
import { getUserEmail } from '../../controllers/auth';
import { Container, Row, Col, Card, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
const SubscribeService = () => { 
    const userEmail = getUserEmail();
    const navigate = useNavigate();

    const [createSubscription, { data, loading, error }] = useMutation(CREATE_SUBSCRIPTION);

    const postSubscription = (response) => {
        console.log('Response:', response);
        navigate('/profile',  { state: { subscribed: true }  });
    }

    const onTokenMonthly = async (token) => {
        console.log( {
            userId: userEmail,
            source: token.id,
            plan: 'Monthly'
        });
        try {
            const { response } = await createSubscription({
                variables: {
                    userId: userEmail,
                    source: token.id,
                    plan: 'Monthly'
                }
            });
            postSubscription(response);
        } catch (error) {
            console.error('Error creating subscription:', error);
        }
    };

    const onToken6Months = async (token) => {
        console.log('Token:', token);
        try {
            const response = await createSubscription({
                variables: {
                    userId: userEmail,
                    source: token.id,
                    plan: '6Months'
                }
            });
            postSubscription(response);
        } catch (error) {
            console.error('Error creating subscription:', error);
        }
    }

    const onTokenYearly = async (token) => {
        console.log('Token:', token);
        try {
            const response = await createSubscription({
                variables: {
                    userId: userEmail,
                    source: token.id,
                    plan: 'Yearly'
                }
            });
            postSubscription(response);
        } catch (error) {
            console.error('Error creating subscription:', error);
        }
    }
    
    return (

        //lets design our own pricing table
        <Container className='mt-5'>
            <Row>
                <Col md={4}>
                    <Card>
                        <Card.Header>
                            <Card.Title>Monthy</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>
                                Job Port Premium
                            </Card.Text>
                            <Card.Text>
                            CA$15 per month
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <StripeCheckout
                                token={onTokenMonthly}
                                email={userEmail}
                                name='Monthly Plan'
                                amount={1500}
                                currency='CAD'
                                stripeKey="pk_test_51P47EO01l6hWzQr1Hvfa2CSiwYvaWHi4CExnJeUbH0kLjMFhjuX2reesTpu1pajJO0PZvlDlzvOq91RCNg7U4EEJ00rFQgTV6X">
                                <button className="btn btn-primary" >Subscribe Now
                                </button>
                            </StripeCheckout>
                        </Card.Footer>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card>
                        <Card.Header>
                            <Card.Title>Every 6 Months</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>
                                Job Port Premium
                            </Card.Text>
                            <Card.Text>
                            CA$80 every 6 months
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <StripeCheckout
                                token={onToken6Months}
                                email={userEmail}
                                name='Every 6 Months Plan'
                                amount={8000}
                                currency='CAD'
                                stripeKey="pk_test_51P47EO01l6hWzQr1Hvfa2CSiwYvaWHi4CExnJeUbH0kLjMFhjuX2reesTpu1pajJO0PZvlDlzvOq91RCNg7U4EEJ00rFQgTV6X">
                                <button className="btn btn-primary" >Subscribe Now
                                </button>
                            </StripeCheckout>
                        </Card.Footer>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card>
                        <Card.Header>
                            <Card.Title>Yearly</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>
                                Job Port Premium
                            </Card.Text>
                            <Card.Text>
                            CA$150 per year
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <StripeCheckout
                                token={onTokenYearly}
                                email={userEmail}
                                name='Yearly Plan'
                                amount={15000}
                                currency='CAD'
                                stripeKey="pk_test_51P47EO01l6hWzQr1Hvfa2CSiwYvaWHi4CExnJeUbH0kLjMFhjuX2reesTpu1pajJO0PZvlDlzvOq91RCNg7U4EEJ00rFQgTV6X">
                                <button className="btn btn-primary" >Subscribe Now
                                </button>
                            </StripeCheckout>
                        </Card.Footer>
                    </Card>
                </Col>

            </Row>
        </Container>
    );

}

export default SubscribeService;