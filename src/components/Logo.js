import React from "react";
import Name from "./Name";
import { Container, Row, Col } from "reactstrap";

const Logo = () => {
  return (
    <Container>
      <Row sm="2">
        <Col>
          <a href="/" > <img alt="CBD" src="/cbd.jpeg" style={{
              width: "80px"
          }} /></a>
        </Col>
        <Col>
          <Name />
        </Col>
      </Row>
    </Container>
  );
};

export default Logo;
