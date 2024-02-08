import React from "react";
import { Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <Row>
      <Col>
        <footer
          className="rounded-top-5 px-4 text-white p-1 text-center"
          style={{
            backgroundColor: "#6A00C9",
            width: "80%",
            margin: "auto",
          }}
        >
          <p>&copy; 2024 Job Portal. All rights reserved.</p>
        </footer>
      </Col>
    </Row>
  );
};

export default Footer;
