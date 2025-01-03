import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Dropdown } from "react-bootstrap";
import { useMutation, useQuery } from "@apollo/client";
import { FETCH_JOB_POST, UPDATE_JOB_POST } from "../graphqlQueries";
import { useNavigate, useParams } from "react-router-dom";
import QueryResult from "../queryResult";
import { dateFormatted } from "../../controllers/helper";
import "bootstrap/dist/css/bootstrap.min.css";

const EMP_EditJobPost = () => {
  const navigate = useNavigate();
  const { id } = useParams();
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
  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const [updateJobPost] = useMutation(UPDATE_JOB_POST);

  const { loading, errorDB, data } = useQuery(FETCH_JOB_POST, {
    variables: { jobPostId: id },
    onCompleted: (data) => {
      setJobTitle(data.jobPost.title);
      setDescription(data.jobPost.description);
      setLocation(data.jobPost.location);
      setExperienceLevel(data.jobPost.experienceLevel);
      setEmploymentType(data.jobPost.employmentType);
      setSalaryRange(data.jobPost.salaryRange);
      setClosingDate(dateFormatted(data.jobPost.closingDate));
    },
  });

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
      const result = await updateJobPost({
        variables: {
          jobId: id,
          jobPostInput: {
            title: jobTitle,
            description: description,
            location: location,
            experienceLevel: experienceLevel,
            employmentType: employmentType,
            salaryRange: salaryRange,
            closingDate: closingDate,
          },
        },
      });
      if (result) {
        postUpdateSuccess(result.data.updateJobPost);
      }
    } catch (error) {
      console.error("Error creating job:", error);
      setError("Error creating job");
    }
  };

  const postUpdateSuccess = (newData) => {
    setError("");
    setErrorJobTitle("");
    setErrorDescription("");
    setErrorLocation("");
    setErrorExperienceLevel("");
    setErrorEmploymentType("");
    setErrorSalaryRange("");
    setErrorClosingDate("");
    setJobTitle(newData.title);
    setDescription(newData.description);
    setLocation(newData.location);
    setExperienceLevel(newData.experienceLevel);
    setEmploymentType(newData.employmentType);
    setSalaryRange(newData.salaryRange);
    setClosingDate(dateFormatted(newData.closingDate));
    setSuccessMessage("Job updated successfully");
    setShowSuccessMessage(true);
  };

  return (
    <QueryResult error={errorDB} loading={loading} data={data}>
      {data && data.jobPost && (
        <Container className="mt-5 p-5" style={{ backgroundColor: "#f0f0f0" }}>
          <Form onSubmit={handleSubmit} className="w-100">
          {error && <span className="text-danger">{error}</span>}
                {showSuccessMessage && (
                  <span className="text-success">{successMessage}</span>
                )}
            <Row>
              <Col md={6} className="right-section align-self-center p-4">
                
                <Form.Group controlId="formJobTtile">
                  <Form.Label>Job Title:</Form.Label>
                  <Form.Control
                    type="text"
                    value={jobTitle}
                    onChange={(event) => setJobTitle(event.target.value)}
                    placeholder="Enter Job Title"
                  />
                </Form.Group>
                {errorJobTitle && (
                  <span className="text-danger">{errorJobTitle}</span>
                )}
                <Form.Group controlId="formLocation">
                  <Form.Label>Location Type:</Form.Label>
                  <Dropdown>
                    <Dropdown.Toggle
                      split
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
                    <span className="text-danger">{errorLocation}</span>
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
                    <span className="text-danger">{errorExperienceLevel}</span>
                  )}
                </Form.Group>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="formEmploymentType">
                      <Form.Label>Employment Type:</Form.Label>
                      <Dropdown>
                        <Dropdown.Toggle
                          split
                          variant="secondary"
                          className="w-100 form-control"
                          id="dropdown-split-basic"
                        >
                          {employmentType}
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="w-100">
                          <Dropdown.Item
                            onClick={() => setEmploymentType("Contract")}
                          >
                            Contract
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => setEmploymentType("Full-time")}
                          >
                            Full-time
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => setEmploymentType("Part-time")}
                          >
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
                      <span className="text-danger">{errorSalaryRange}</span>
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
                      <span className="text-danger">{errorClosingDate}</span>
                    )}
                  </Col>
                </Row>
              </Col>
              <Col md={6} className=" p-4">
                <Form.Group controlId="formDescription">
                    <Form.Label>Description:</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows = {15}
                      value={description}
                      onChange={(event) => setDescription(event.target.value)}
                      placeholder="Enter Job Description"
                    />
                  </Form.Group>
                  {errorDescription && (
                    <span className="text-danger">{errorDescription}</span>
                  )}
              </Col>
            </Row>
            <Row>
              <Col className="text-center">
              <div className="text-center mt-4">
                  <Button
                    variant="success"
                    type="submit"
                    className="m-1 jp-bg-success"
                  >
                    Save Job
                  </Button>
                  <Button
                    variant="warning"
                    onClick={() => {
                      navigate(`/recruiter/jobposts/${id}`);
                    }}
                    className="m-1 jp-bg-success"
                  >
                    Cancel
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        </Container>
      )}
    </QueryResult>
  );
};

export default EMP_EditJobPost;
