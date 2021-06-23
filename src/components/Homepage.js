import React from "react";
import NewProducts from "./NewProducts";
import PromotedProducts from "./PromotedProducts";
import BestSeler from "./BestSeler";
import Slider from "./Slider";
import { Container, Row, Col } from "reactstrap";

const Homepages = () => {
  return (
    <Container>
      <Row>
        <Col>
          <Slider />
        </Col>
      </Row>
      <Row>
        <Col>
          <NewProducts />
        </Col>
      </Row>
      <Row>
        <Col>
          <PromotedProducts />
        </Col>
      </Row>
      <Row>
        <Col>
          <BestSeler />
        </Col>
      </Row>
    </Container>
  );
};

export default Homepages;
