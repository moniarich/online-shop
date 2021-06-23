
import React, { Fragment, useState } from "react";
import { Col, Row, Button, Alert, ButtonToggle } from "reactstrap";

const LogOut = () => {
    const [message, setMessages] = useState({ type: "", text: "" });
    const logOutFetch = async () => {
        try {
          const response = await fetch("/api/logout", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
          });
    
          if (response.ok) {
            setMessages({ type: "success", text: "You are log out!" });
            document.location.href = "/";
          } else {
            const data = await response.json();
            setMessages({ type: "danger", text: data.message });
          }
        } catch (e) {
          setMessages({ type: "danger", text: e.message });
        }
      };
    
    return(
        <Fragment>
            <Row style={{color:"#fff" }}>
                <Col>
                  <ButtonToggle size="sm" onClick={() => logOutFetch()} style={{backgroundColor:"#011a00"}}>Log Out</ButtonToggle>
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
        </Fragment>
    )
}
export default LogOut;