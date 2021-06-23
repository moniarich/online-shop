import React, { Fragment, useState } from "react";
import Header from "../components/Header";
import {
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  FormText,
} from "reactstrap";
import Footer from "../components/Footer";
import { Alert } from "reactstrap";

const SignUp = () => {
  const [message, setMessages] = useState({ type: "", text: "" });
  const [user, setUser] = useState({ password: "" });
  const [repeatPassword, setRepeatPassword] = useState();

  // setUser({...user, email: e.target.value })

  console.log(user);

  const userSignUp = async () => {
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        setMessages({ type: "success", text: "registration was successful" });
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
        <Form
          style={{ marginLeft: "20%", paddingBottom: "15%", paddingTop: "5%" }}
        >
          <Row form>
            <Col md={6} style={{ paddingTop: "5%", paddingBottom: "5%" }}>
              <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="exampleEmail"
                  placeholder="e-mail"
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6} style={{ paddingTop: "5%", paddingBottom: "5%" }}>
              <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="examplePassword"
                  placeholder="password"
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                  invalid={user.password.length <= 8}
                />
              </FormGroup>
              {user.password.length <= 8 ? (
                <FormText>Must be at least 8 charakters</FormText>
              ) : (
                ""
              )}
            </Col>
          </Row>
          <Row>
            <Col md={6} style={{ paddingTop: "5%", paddingBottom: "5%" }}>
              <FormGroup>
                <Label for="examplePassword">Repeat Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="examplePassword"
                  placeholder=" repeat password"
                  onChange={(e) => setRepeatPassword(e.target.value)}
                  invalid={repeatPassword !== user.password}
                />
              </FormGroup>
              {repeatPassword !== user.password ? (
                <FormText>Password doesn't match</FormText>
              ) : (
                ""
              )}
            </Col>
          </Row>
          <Row>
            <Col md={6} style={{ paddingTop: "5%", paddingBottom: "5%" }}>
              <FormGroup>
                <Label for="exampleEmail">Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="exampleEmail"
                  placeholder="name"
                  onChange={(e) =>
                    setUser({ ...user, firstName: e.target.value })
                  }
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6} style={{ paddingTop: "5%", paddingBottom: "5%" }}>
              <FormGroup>
                <Label for="examplePassword">Surname</Label>
                <Input
                  type="text"
                  name="surname"
                  id="examplePassword"
                  placeholder="surname"
                  onChange={(e) =>
                    setUser({ ...user, lastName: e.target.value })
                  }
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup check>
                <Input type="checkbox" name="check" id="exampleCheck" />
                <Label for="exampleCheck" check>
                  Check me out
                </Label>
              </FormGroup>
              <Button onClick={() => userSignUp()}>Sign in</Button>
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
        </Form>
      </Container>
      <Footer />
    </Fragment>
  );
};

export default SignUp;
