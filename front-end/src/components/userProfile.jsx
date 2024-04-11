import React, {  useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import QueryResult from "./queryResult";
import { useMutation, useQuery } from "@apollo/client";
import { FETCH_USER_PERSONAL_INFO, UPDATE_USER_PERSONAL_INFO } from "./graphqlQueries";
import "bootstrap/dist/css/bootstrap.min.css";
import { validateName, dateFormatted } from "../controllers/helper";
import ManageResume from "./manageResume";
import ManageService from "./user_account/ManageService";

const UserProfile = () => {
    const [formDisabled, setFormDisabled] = useState(true);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [accountType, setAccountType] = useState("Job Seeker");
    const [error, setError] = useState("");
    const [errorFirstName, setErrorFirstName] = useState("");
    const [errorLastName, setErrorLastName] = useState("");
    const [errorBirthDate, setErrorBirthDate] = useState("");

    const [updateUserPersonalInfo] = useMutation(UPDATE_USER_PERSONAL_INFO, );

    const handleSave = async (event) => {
        event.preventDefault();
        let hasError = false;
        // Validate First Name
        if (firstName.trim().length === 0) {
        setErrorFirstName("First name is required");
        hasError = true;
        } else if (!validateName(firstName)) {
        setErrorFirstName("First name is invalid");
        hasError = true;
        } else {
        setErrorFirstName("");
        }
        // Validate Last Name
        if (lastName.trim().length === 0) { 
        setErrorLastName("Last name is required");
        hasError = true;
        } else if (!validateName(lastName)) {
        setErrorLastName("Last name is invalid");
        hasError = true;
        } else {
        setErrorLastName("");
        }
        
        // Validate Birth Date
        if (birthDate.trim().length === 0) {
        setErrorBirthDate("Birth date is required");
        hasError = true;
        } else {
        setErrorBirthDate("");
        }
        
        // If there is an error, do not proceed
        if (hasError) {
        return;
        }

        try {
            const userPersonalInfo = {
                firstName,
                lastName,
                birthDate
            };
            const { data } = await updateUserPersonalInfo({
                variables: { userPersonalInfo }
            });
            console.log("Data::: ", data);
            if (data && data.updateUserPersonalInfo) {
                postUpdate(data.updateUserPersonalInfo);
                refetch();
            }


        
        } catch (error) {
        console.error("Error creating user:", error.message);
        if (error.message.includes("GraphQL error")) {
            //const errorMessage = error.message.replace("GraphQL error: ", "");
            setError("Something went wrong. Please try again later.");
        } else {
            setError(error.message);
        }
        }
    };

    const postUpdate = (newData) => {
        setFormDisabled(true);
        setError("");
        setErrorFirstName("");
        setErrorLastName("");
        setErrorBirthDate("");
        setFirstName(newData.firstName);
        setLastName(newData.lastName);
        setBirthDate(dateFormatted(newData.birthDate));

    };

    const handleCancel = () => {
        setFormDisabled(true);
        setError("");
        setErrorFirstName("");
        setErrorLastName("");
        setErrorBirthDate("");
        setFirstName(data.user.firstName);
        setLastName(data.user.lastName);
        setBirthDate(dateFormatted(data.user.birthDate));
    };
    
    const setUserDetails = () => {
        console.log("Data::: ", data);
        if (data && data.user) {
            setFormDisabled(true);
            setFirstName(data.user.firstName);
            setLastName(data.user.lastName);
            setEmail(data.user.email);
            setBirthDate(dateFormatted(data.user.birthDate)); 
            setAccountType(data.user.accountType.name);
        }
    }

    const { loading, errorDB, data, refetch } = useQuery(FETCH_USER_PERSONAL_INFO, {
        variables: { email: localStorage.getItem("userEmail") }, onCompleted: setUserDetails
    });    

    return (
        <QueryResult error={errorDB} loading={loading} data={data}>
            {data && data.user && (
                <Container className="mt-5 p-5" style={{ backgroundColor: "#f0f0f0" }}>
                    <Row>
                        <Col md={8}>
                            <h3>Manager User Profile</h3>
                        </Col>
                        <Col md={2} className="d-flex flex-row-reverse">
                            
                            {formDisabled ? (
                                <Button onClick={() => setFormDisabled(!formDisabled)} className="m-1">
                                Edit
                                </Button>
                            ) : (
                                    <>
                                <Button onClick={handleCancel} className="m-1">
                                Cancel
                                </Button>
                                
                                <Button onClick={handleSave} className="m-1">
                                Save
                                </Button>
                                    </>
                            )}
                        </Col>
                    </Row>
                    <Row>
                        <Col md={10} className="right-section align-self-center p-4">
                            
                            {formDisabled ?
                                (
                                <Row className="mt-5">
                                    <Col md={6}>
                                    <p>First Name: {firstName}</p>
                                    </Col>
                                    <Col md={6}>
                                    <p>Last Name: {lastName}</p>
                                    </Col>
                                    <Col md={6}>
                                    <p>Email: {email}</p>
                                    </Col>
                                    <Col md={6}>
                                    <p>Birth Date: {birthDate}</p>
                                    </Col>
                                </Row>                        
                                )
                                :
                                (<Form onSubmit={handleSave} className="w-100" disabled={formDisabled}>
                                {error && (
                                <span className="text-danger">
                                    {error}
                                </span>
                                )}
                                <Row>
                                <Col md={6}>
                                    <Form.Group controlId="formFirstName" >
                                    <Form.Label>First Name:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={firstName}
                                        onChange={(event) => setFirstName(event.target.value)}
                                        placeholder="Enter your first name"
                                        
                                    />
                                    </Form.Group>
                                    {errorFirstName && (
                                    <span className="text-danger">
                                        {errorFirstName}
                                    </span>
                                    )}
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="formLastName">
                                    <Form.Label>Last Name:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={lastName}
                                        onChange={(event) => setLastName(event.target.value)}
                                        placeholder="Enter your last name"
                                    />
                                    </Form.Group>
                                    {errorLastName && (
                                    <span className="text-danger">
                                        {errorLastName}
                                    </span>
                                    )}
                                        </Col>
                                        <Col md={6}>
                                    <Form.Group controlId="formBirthDate">
                                    <Form.Label>Birth Date:</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={birthDate}
                                        onChange={(event) => setBirthDate(event.target.value)}
                                        
                                    />
                                    </Form.Group>
                                    {errorBirthDate && (
                                    <span className="text-danger">
                                        {errorBirthDate}
                                    </span>
                                    )}
                                        </Col>
                                        <Col md={6}>
                                        <Form.Group controlId="formEmail">
                                <Form.Label>Email:</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    placeholder="Enter your email"
                                    disabled
                                />
                                
                                            </Form.Group>
                                            </Col>
                                </Row>
                            </Form>)
                            }
                            
                        </Col>
                        
                    </Row>
                    <Row className="mt-5">
                        <Col md={12}>
                            <ManageResume />
                        </Col>
                    </Row>
                    
                    <Row className="mt-5">
                        <Col md={6}>
                            <ManageService />
                        </Col>
                    </Row>
                </Container>
            )}
        </QueryResult>
        
    );
};

export default UserProfile;
