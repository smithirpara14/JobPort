import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Dropdown } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { CREATE_JOB_POST } from "../graphqlQueries";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const CreateJobPost = () => {

    const navigate = useNavigate();
    const [jobTitle, setJobTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [experienceLevel, setExperienceLevel] = useState("");
    const [employmentType, setEmploymentType] = useState("");
    const [salaryRange, setSalaryRange] = useState("");
    const [closingDate, setClosingDate] = useState("");
    const [error, setError] = useState("");
    const [errorJobTitle, setErrorJobTitle] = useState("");
    const [errorDescription, setErrorDescription] = useState("");
    const [errorLocation, setErrorLocation] = useState("");
    const [errorExperienceLevel, setErrorExperienceLevel] = useState("");
    const [errorEmploymentType, setErrorEmploymentType] = useState("");
    const [errorSalaryRange, setErrorSalaryRange] = useState("");
    const [errorClosingDate, setErrorClosingDate] = useState("");
    const [createJobPost] = useMutation(CREATE_JOB_POST);

    const handleSubmit = async (event) => {

        event.preventDefault();
        let hasError = false;
        // Validate Job Title
        if (jobTitle.trim().length === 0) {
            setErrorJobTitle("Job title is required");
            hasError = true;
        } else {
            setErrorJobTitle("");
        }
        // Validate Description
        if (description.trim().length === 0) {
            setErrorDescription("Description is required");
            hasError = true;
        } else {
            setErrorDescription("");
        }
        // Validate Location
        if (location.trim().length === 0) {
            setErrorLocation("Location is required");
            hasError = true;
        } else {
            setErrorLocation("");
        }
        // Validate Experience Level
        if (experienceLevel.trim().length === 0) {
            setErrorExperienceLevel("Experience level is required");
            hasError = true;
        } else {
            setErrorExperienceLevel("");
        }
        // Validate Employment Type
        if (employmentType.trim().length === 0) {
            setErrorEmploymentType("Employment type is required");
            hasError = true;
        } else {
            setErrorEmploymentType("");
        }
        // Validate Salary Range
        if (salaryRange.trim().length === 0) {
            setErrorSalaryRange("Salary range is required");
            hasError = true;
        } else {
            setErrorSalaryRange("");
        }
        // Validate Closing Date
        if (closingDate.trim().length === 0) {
            setErrorClosingDate("Closing date is required");
            hasError = true;
        } else {
            setErrorClosingDate("");
        }
        if (hasError) {
            return;
        }
        try {
            const result = await createJobPost({
                variables: {
                    jobPostInput: {
                        title: jobTitle,
                        description: description,
                        location: location,
                        experienceLevel: experienceLevel,
                        employmentType: employmentType,
                        salaryRange: salaryRange,
                        closingDate: closingDate
                    }
                }
            });
            if (result) {
                navigate("/jobposts");
            }
        } catch (error) {
            console.error("Error creating job:", error);
            setError("Error creating job");
        }
    }



    return (
        <Container className="mt-5 p-5" style={{ backgroundColor: "#f0f0f0" }}>
          <Row>
            <Col md={6} className="right-section align-self-center p-4">
              <Form onSubmit={handleSubmit} className="w-100">
                {error && (
                  <span className="text-danger">
                    {error}
                  </span>
                )}
                    <Form.Group controlId="formJobTtile">
                      <Form.Label>Job Title:</Form.Label>
                      <Form.Control
                        type="text"
                        value={jobTitle}
                        onChange={(event) => setJobTitle(event.target.value)}
                        placeholder="Enter your first name"
                        
                      />
                    </Form.Group>
                    {errorJobTitle && (
                      <span className="text-danger">
                        {errorJobTitle}
                      </span>
                    )}
                    <Form.Group controlId="formDescription">
                      <Form.Label>Description:</Form.Label>
                      <Form.Control
                        type="textarea"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        placeholder="Enter your last name"
                      />
                    </Form.Group>
                    {errorDescription && (
                      <span className="text-danger">
                        {errorDescription}
                      </span>
                    )}
                <Form.Group controlId="formLocation">
                  <Form.Label>Location Type:</Form.Label>
                  <Dropdown>
                        <Dropdown.Toggle split
                          variant="secondary"
                          className="w-100 form-control"
                          id="dropdown-split-basic"
                        >
                          {location}
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="w-100">
                          <Dropdown.Item onClick={() => setLocation("Remote")}>
                            Remote
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => setLocation("Hybrid")}>
                            Hybrid
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => setLocation("On-site")}>
                            On-site
                          </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                            {errorLocation && (
                                <span className="text-danger">
                                    {errorLocation}
                                </span>
                            )}

                </Form.Group>
                <Form.Group controlId="formExperienceLevel">
                  <Form.Label>Experience Level:</Form.Label>
                  <Form.Control
                    type="text"
                    value={experienceLevel}
                    onChange={(event) => setExperienceLevel(event.target.value)}
                    placeholder="Enter experience level"
                  />
                  {errorExperienceLevel && (
                    <span className="text-danger">
                      {errorExperienceLevel}
                    </span>
                  )}
                </Form.Group>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="formEmploymentType">
                    <Form.Label>Employment Type:</Form.Label>
                    <Dropdown>
                        <Dropdown.Toggle split
                          variant="secondary"
                          className="w-100 form-control"
                          id="dropdown-split-basic"
                        >
                        {employmentType}
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="w-100">
                            <Dropdown.Item onClick={() => setEmploymentType("Contract")}>
                                Contract
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => setEmploymentType("Full-time")}>
                                Full-time
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => setEmploymentType("Part-time")}>
                                Part-time
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    {errorEmploymentType && (
                        <span className="text-danger">
                            {errorEmploymentType}
                        </span>
                    )}
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formSalaryRange">
                      <Form.Label>Salaray Range:</Form.Label>
                      <Form.Control
                        type="text"
                        value={salaryRange}
                        onChange={(event) => setSalaryRange(event.target.value)}
                        placeholder="Enter salary range"
                      />
                    </Form.Group>
                    {errorSalaryRange && (
                      <span className="text-danger">
                        {errorSalaryRange}
                      </span>
                    )}
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formClosingDate">
                    <Form.Label>Closing Date:</Form.Label>
                    <Form.Control
                        type="date"
                        value={closingDate}
                        onChange={(event) => setClosingDate(event.target.value)}
                        
                    />
                    </Form.Group>
                    {errorClosingDate && (
                    <span className="text-danger">
                        {errorClosingDate}
                    </span>
                    )}
                </Col>
                </Row>
                <div className="text-center">
                <Button
                    variant="primary"
                    type="submit"
                    className="w-50 mt-5 jp-bg-primary m-auto"
                  >
                    Save Job
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      );
}

export default CreateJobPost;