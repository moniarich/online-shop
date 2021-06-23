import React from "react";
import { Fragment } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
} from "reactstrap";
import ProductCard from "./ProductCard";

const PromotedProducts = () => {
  return (
    <Fragment>
      <Container style={{ paddingTop: "40px", paddingBottom: "20px" }}>
        <Row>
          <Col>
            <h2 style={{ color: "red" }}>Promoted products</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <ProductCard
            id="4"
              img="/hempoil1.jpg"
              title="Hempdew"
              subtitle="Hemp Oil"
              description={
                "100% NATURAL: All ingredients are of natural sourced, Premium levels of purity & safety. GMP Certified / Gluten-Free / GMO-Free / Vegan. Hempdew will exceed your highest expectations!"
              }
            />
          </Col>
          <Col>
            <ProductCard
            id="6"
              img="/hempoiltab1.jpg"
              title="Hofigal"
              subtitle="Hemp Tablets"
              description={
                "OPTIMAL RATIO omega 6/omega 3 : 3/1, vegetal resource rich in fatty acids Omega-3 and Omega-6 in an optimally balanced ratio (1:3). PURE cold pressed 1000 mg of hemp seed oil capsules. "
              }
            />
          </Col>
          <Col>
            <ProductCard
            id="7"
              img="/hempoiltab2.jpg"
              title="Bulk CBD Oil Softgels"
              subtitle="Hemp Tablets"
              description={
                "Contains 10 mg of CBD per softgel from a blend of CBD and Hemp-seed Oil. 0% THC. A non-psychoactive, non-addictive and perfectly legal supplement. This product is not suitable for persons aged under eighteen. "
              }
            />
          </Col>
          <Col>
            <ProductCard
            id="5"
              img="/hempoil2.jpg"
              title="Green Stem"
              subtitle="Hemp Oil"
              description={
                "award winning brand, including ‘best CBD oil’ won twice (April/sept 2019 hemp & CBD expo UK), with 8 further Awards including best cosmetic And best vape liquid. Four different flavours to choose. "
              }
            />
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default PromotedProducts;
