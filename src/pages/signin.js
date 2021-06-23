import React, { Fragment, useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Row,
  Col,
  Alert,
} from "reactstrap";
import Header from "../components/Header";
import Footer from "../components/Footer";

const SignIn = () => {
  const [message, setMessages] = useState({ type: "", text: "" });
  const [user, setUser] = useState({ pasword: "" });

  // setUser({...user, email: e.target.value })

  const userSignIn = async () => {
    try {
      const response = await fetch("/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        setMessages({ type: "success", text: "You are log in!" });
        document.location.href = "/";
      } else {
        const data = await response.json();
        setMessages({ type: "danger", text: data.message });
      }
    } catch (e) {
      setMessages({ type: "danger", text: e.message });
    }
  };
  return (
    <Fragment>
      <Header />
      <Container>
        <Row style={{ paddingBottom: "10%" }}>
          <Form
            style={{
              width: "50%",
              textAlign: "center",
              margin: "auto",
              paddingTop: "10%",
              paddingBottom: "20%",
            }}
          >
            <Container>
              <Row style={{ paddingBottom: "5%", paddingTop: "5%" }}>
                <Col>
                  <FormGroup>
                    <Label for="exampleEmail" hidden>
                      Email
                    </Label>
                    <Input
                      type="email"
                      name="email"
                      id="exampleEmail"
                      placeholder="Email"
                      onChange={(e) =>
                        setUser({ ...user, email: e.target.value })
                      }
                    />
                  </FormGroup>{" "}
                </Col>
              </Row>
              <Row style={{ paddingBottom: "5%", paddingTop: "5%" }}>
                <Col>
                  <FormGroup>
                    <Label for="examplePassword" hidden>
                      Password
                    </Label>
                    <Input
                      type="password"
                      name="password"
                      id="examplePassword"
                      placeholder="Password"
                      onChange={(e) =>
                        setUser({ ...user, password: e.target.value })
                      }
                    />
                  </FormGroup>{" "}
                </Col>
              </Row>
              <Row style={{ paddingBottom: "5%", paddingTop: "5%" }}>
                <Col>
                  <Button onClick={() => userSignIn()}>Submit</Button>
                </Col>
              </Row>
              <Row>
                <Col>
                  {message.text !== "" ? (
                    <Alert
                      color={message.type}
                      style={{ textAlign: "center", marginTop: "20px" }}
                    >
                      {message.text}
                    </Alert>
                  ) : (
                    ""
                  )}
                </Col>
              </Row>
            </Container>
          </Form>
        </Row>
      </Container>
      <Footer />
    </Fragment>
  );
};

export default SignIn;
