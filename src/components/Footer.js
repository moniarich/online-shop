import React from "react";
import { Container } from "reactstrap";

const Footer = () => {
  return (
    <Container
      fluid={true}
      style={{
        backgroundColor: "#011a00",
        color: "#fff",
        fontFamily:"Roboto",
      }}
    >
      <h3>Social media</h3>
      <h3>Contakt</h3>
    </Container>
  );
};
export default Footer;
