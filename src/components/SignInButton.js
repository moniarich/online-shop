import React, { Fragment, useEffect, useState } from "react";
import { ButtonToggle, Col, Container, Row, Alert } from "reactstrap";
import LogOut from "./LogOut";

const SignInButton = () => {
  const [user, setUser] = useState();


  const logOutFetch = async () => {
      try {
        const response = await fetch("/api/logout");
        if (response.ok) {
          const data = await response.json();
          
        }
      } catch (e) {}
    };

  const fetchUser = async () => {
    try {
      const response = await fetch("/api/user");
      if (response.ok) {
        const data = await response.json();
        setUser(data);
        console.log(user);
      }
    } catch (e) {}
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Fragment>
      {user === undefined ? (
        <Container>
          <Row>
            <Col>
              <div >
                <a href="/signin">
                  {" "}
                  <ButtonToggle style={{backgroundColor:"#011a00"}}>Sign in!</ButtonToggle>{" "}
                </a>
                <a href="/signup">
                  {" "}
                  <ButtonToggle style={{backgroundColor:"#011a00"}}>Sign up!</ButtonToggle>{" "}
                </a>
              </div>
            </Col>
          </Row>
        </Container>
      ) : (
        <Container>
          <Row>
            <Col>
              <h5>Hello </h5>
              </Col>
              <Col>
              <h5>{user.firstName}</h5>
            </Col>
            <Col sm={{ size: 2 }}> <a href="/">
                  {" "}
                  <ButtonToggle size="sm" onClick={() => logOutFetch()} style={{backgroundColor:"#011a00"}}>Log Out</ButtonToggle>
                </a></Col>
          </Row>
          <Row>
         
          </Row>
        </Container>
      )}
    </Fragment>
  );
};
export default SignInButton;
