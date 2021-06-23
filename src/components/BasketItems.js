import React, { Fragment } from "react";
import { Container, Row, Col } from "reactstrap";

const BasketItems = (props) => {
  return (
    <Fragment>
      <Container>
        <Row>
          <Col>{props.title}</Col>
          <Col>
          {props.price.currency}
            {props.price.value}
            
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};
export default BasketItems;
