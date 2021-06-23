import React from "react";
import { Fragment } from "react";
import {
  Container,
  Row,
  Col,
} from "reactstrap";
import ProductCard from "./ProductCard";

const NewProducts = () => {
  return (
    <Fragment>
      <Container style={{ paddingTop: "40px", paddingBottom: "20px" }}>
        <Row>
          <Col>
            <h2 style={{ color: "red" }}>New</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <ProductCard
            id="1"
              img="/gummies1.jpg"
              title="Premium Hemp Gummies"
              subtitle="gummies"
              description={
                "Our Gummies have 750,000mg of Plant Benefits and they are 100% Sugar-FREE, Gluten-Free, Non-GMO. 100% NATURAL Gummies - PERFECTLY FORMULATED essential EXTRACT of HERBAL PLANTs + Vitamins and Minerals Key Product Features. Made with enhanced extract of Plants, enriched with fatty acids Omega 3, 6, & 9 plus VITAMINS & MINERALS "
              }
            />
          </Col>
          <Col>
            <ProductCard
            id="2"
              img="/chocolate.jpg"
              title="Organic Hemp Chocolate"
              subtitle="dark chocolate"
              description={
                "Hand made and packed by us, they make great presents and we can gift wrap them to your instructions.Our hemp chocolate bars have even been designed so that each segment is the shape of a hemp seed! Wrapped in 100% compostable natural plastic and boxed in recyclable card."
              }
            />
          </Col>
          <Col>
            <ProductCard
            id="3"
              img="/gummies2.jpg"
              title="Infused Gummies"
              subtitle="gummies"
              description={
                "KekaNaturals Gummies Contain Essential Vitamins & Omega 3 & 6 Fats To Help You Maintain A Healthy Lifestyle. We are committed to providing a 100% Natural and Safe gummies. KekaNaturals Prides Itself In The Highest Quality Products For Every Customer. Made from Natural Ingredients For A Delicious, Calming And Enjoyable Experience."
              }
            />
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};
export default NewProducts;
