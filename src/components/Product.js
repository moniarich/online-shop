import React, { Fragment, useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  ButtonGroup,
  InputGroup,
  Input,
  InputGroupAddon,
  Alert,
} from "reactstrap";
import Prices from "../components/Prices";

const Product = (props) => {
  const [message, setMessages] = useState({ type: "", text: "" });
  const [basketQuantity, setBasketQuantity] = useState(1);

  async function fetchAddToBasket() {
    try {
      const response = await fetch("/api/basket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: props.id,
          quantity: basketQuantity,
        }),
      });
      if (response.ok) {
        setMessages({ type: "success", text: "success add to basket" });
        setBasketQuantity(1);
      } else {
        const data = await response.json();
        setMessages({ type: "danger", text: data.message });
      }
    } catch (e) {
      setMessages({ type: "danger", text: e.message });
    }
  }

  //respons.ok ?

  return (
    <Fragment>
      <Container style={{ paddingBottom: "5%", paddingTop: "5%" }}>
        <Row>
          <Col>
            <h1 style={{ paddingBottom: "10%", paddingTop: "5%" }}>
              {props.title}
            </h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <img alt={props.title} src={props.img} />
          </Col>
          <Col>
            <Container>
              <Row>
                <Col>
                  <p>{props.description}</p>
                </Col>
              </Row>
              <Row>
                <Col style={{ paddingBottom: "10%", paddingTop: "15%" }}>
                  <Prices price={props.price}/>
                </Col>
              </Row>
              <Row>
                <Col>
                  <ButtonGroup>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <Button style={{backgroundColor:"#011a00", color:"fff", fontFamily:"Roboto"}}
                          value="-"
                          onClick={() =>
                            setBasketQuantity(
                              basketQuantity > 1 ? basketQuantity - 1 : 1
                            )
                          }
                        >
                          -
                        </Button>
                      </InputGroupAddon>
                      <Input
                        value={basketQuantity}
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          setBasketQuantity(isNaN(val) ? 1 : val);
                        }}
                        style={{
                          webkitAppearance: "none",
                          margin: "0",
                        }}
                      />

                      <InputGroupAddon addonType="append">
                        <Button style={{backgroundColor:"#011a00", color:"fff", fontFamily:"Roboto"}}
                          value="+"
                          onClick={() => setBasketQuantity(basketQuantity + 1)}
                        >
                          +
                        </Button>
                      </InputGroupAddon>
                    </InputGroup>
                  </ButtonGroup>
                </Col>
              </Row>
              <Row>
                <Col style={{ marginTop: "7px", marginLeft: "80px" }}>
                  <Button  style={{backgroundColor:"#011a00", color:"fff", fontFamily:"Roboto"}} onClick={() => fetchAddToBasket()}>
                    Add to basket
                  </Button>
                </Col>
              </Row>
            </Container>
            <Container>
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
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Product;

/*


if (counter > 0) {
  setCounter(counter - 1)
} else {
  setCounter(0)
}


setCounter(counter > 0 ? counter - 1 : 0)

function q() {
  if (counter > 0) {
    return counter - 1
  } else {
    return 0
  }
}

*/
