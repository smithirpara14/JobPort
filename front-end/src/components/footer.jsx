import React from "react";
import { Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <Row className="mt-4">
      <Col>
        <footer
          className="fixed-bottom text-white p-3 text-center"
          style={{ backgroundColor: "#6A00C9" }}
        >
          <p>&copy; 2024 Job Portal. All rights reserved.</p>
        </footer>
      </Col>
    </Row>
  );
};

export default Footer;
