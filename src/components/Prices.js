import React, { Fragment } from "react";
import { Container, Row, Col } from "reactstrap";

const Prices = (props) => {
 const currency = props.price.currency;

  return (
    <Fragment>
      <Container>
        {currency === "£" || currency === "$" ? (
          <Row>
            <Col>
              {currency}
              {props.price.value}
            </Col>
          </Row>
        ) : (
          <Row>
            <Col>
              {props.price.value}
              {currency}
            </Col>
          </Row>
        )}
      </Container>
    </Fragment>
  );
};
export default Prices;
