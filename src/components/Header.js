import React from "react";
import Logo from "./Logo";
import SignInButton from "./SignInButton";
import Menu from "./Menu";
import { Container, Row, Col } from "reactstrap";
import Basket from "./Basket";
import Search from "./Search";
import "bootstrap/dist/css/bootstrap.min.css";

const Header = () => {
  return (
    <Container className="Logo"
      fluid={true}
      style={{
        maxWidth: "85%",
        marginTop: "15px",
      }}
    >
      <Row>
        <Col>
          <Logo />
        </Col>
        <Col
          sm={{ size: 4 }}
          style={{
            marginLeft: "20%",
          }}
        >
          <Search />
        </Col>
        <Col sm={{ size: 2 }}>
          <SignInButton />
        </Col>
        <Col sm={{ size: 2 }} style={{paddingLeft:"5%"}}>  
          <Basket />
        </Col>
      </Row>
      <Row>
        <Col>
          <Menu />
        </Col>
      </Row>
    </Container>
  );
};
export default Header;
