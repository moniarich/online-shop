import React from "react";
import { Fragment } from "react";
import { Container, Row, Col } from "reactstrap";
import ProductCard from "./ProductCard";

const BestSeler = () => {
  return (
    <Fragment>
      <Container style={{ paddingTop: "40px", paddingBottom: "20px" }}>
        <Row>
          <Col>
            <h2 style={{ color: "red" }}>Best Seler</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <ProductCard
              id="8"
              img="/hempointment.jpg"
              title="Puraganic"
              subtitle="HempOintment"
              description={
                " PURAGANIC HEMP DRY SKIN RELIEF BALM - Is a special blend designed to help heal irritated, dry, itchy skin like psoriasis & eczema. Hemp Dry Skin Relief Balm revitalises and renews your skin providing healing and calming effect."
              }
            />
          </Col>
          <Col>
            <ProductCard
              id="9"
              img="/hempointment2.jpg"
              title="GreenPeople"
              subtitle="HempOintment"
              description={
                "Natural Ingredient: The unique formula is rich in natural ingredients, Our natural formula contains the high concentration of Hemp Extract, Menthol, Aloe Veraect, Arnica Montana, ect. Which helps to relieve joint stiffness and pain, and has a certain effect on blood circulation, muscle stiffness, softening the skin and refreshing."
              }
            />
          </Col>
          <Col>
            <ProductCard
              id="10"
              img="/hempointment3.jpg"
              title="Hemp Healing Skin Ointment"
              subtitle="HempOintment"
              description={
                " NATURAL SKIN OINTMENT: This ointment is crafted to leave skin feeling rejuvenated and fresh. This is an all-natural healing skin ointment blend using some of nature's finest and most powerful healing agents such as Propolis - Beeswax - Levander - Hemp Extract - Olive Oil working synergistically in perfect balance to create the best skin ointment on the market "
              }
            />
          </Col>
          <Col>
            <ProductCard
              id="11"
              img="/hempointment4.jpg"
              title="Neviss"
              subtitle="HempBalm"
              description={
                "The organic hemp pain cream provide relief for sore muscles, joint, knee, neck & back pains, inflammation & burns, while also restoring comfort and mobility. You can apply the hemp cream for joint pain on your neck, shoulders, wrists, elbows, knees, muscle pain and other body areas, it will continue a long lasting 6-8 hours with each application."
              }
            />
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};
export default BestSeler;
