import React, { Fragment, useState, useEffect } from "react";
import { FaShoppingBasket } from "react-icons/fa";
import { ImBin } from "react-icons/im";
import { Link } from "react-router-dom";
import {
  Nav,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  Button,
  Spinner,
  Container,
  Col,
  Row,
  Input,
  InputGroupAddon,
  InputGroup,
  ButtonGroup,
  Alert,
} from "reactstrap";
import BasketItems from "./BasketItems";

const Basket = () => {
  const [message, setMessages] = useState({ type: "", text: "" });
  const [basketQuantities, setBasketQuantities] = useState([]);

  const [basketItems, setBasketItems] = useState([]);
  // basketItems
  const [isLoading, setisLoading] = useState(true);
  async function fetchBasketItems() {
    setisLoading(true);
    const response = await fetch("/api/basket");
    const data = await response.json();
    setisLoading(false);
    //
    setBasketItems(data);
    setBasketQuantities(data.map((item) => item.quantity));
    setMessages({ type: "", text: "" });
  }

  // setBasketItems()
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => {
    if (!dropdownOpen) {
      fetchBasketItems();
    }

    setDropdownOpen(!dropdownOpen);
  };

  const updateBasket = async (index, q) => {
    try {
      const response = await fetch("/api/basket", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: basketItems[index].productId,
          quantity: basketQuantities[index],
        }),
      });
      if (response.ok) {
        setMessages({ type: "success", text: "success add to basket" });
        setBasketQuantities(1);
      } else {
        const data = await response.json();
        setMessages({ type: "danger", text: data.message });
      }
    } catch (e) {
      setMessages({ type: "danger", text: e.message });
    }
    // put

    setBasketQuantities(
      basketQuantities.map((item, index2) => {
        if (index === index2) {
          return q;
        }
        return item;
      })
    );
  };
  const deleteItem = async (index) => {
    try {
      const response = await fetch("/api/basket", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: basketItems[index].productId,
        }),
      });
      if (response.ok) {
        setBasketItems(
          basketItems.reduce((acc, curr, currIndex) => {
            if (currIndex !== index) {
              acc.push(curr);
            }

            return acc;
          }, [])
        );
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
      <Nav pills >
        <Dropdown nav isOpen={dropdownOpen} toggle={toggle} style={{color: "#011a00"}} >
          <DropdownToggle nav caret style={{color: "#fff",backgroundColor:"#011a00"}} >
            <FaShoppingBasket style={{color: "#fff",backgroundColor:"#fff"}} />
          </DropdownToggle>
          <DropdownMenu style={{color: "#011a00"}} className="Logo">
            {isLoading ? (
              <Container>
                <Row>
                  <Col style={{ textAlign: "center" }}>
                    <Spinner color="secondary" />
                  </Col>
                </Row>
              </Container>
            ) : (
              <ul>
                {basketItems.map((product, index) => (
                  <li key={product.productId}>
                    <BasketItems price={product.price} title={product.title} />
                    <Container>
                      <Row size="sm">
                        <Col>
                          <ButtonGroup>
                            <InputGroup>
                              <InputGroupAddon addonType="prepend">
                                <Button style={{color: "#fff",backgroundColor:"#011a00"}}
                                  outline
                                  color="secondary"
                                  size="sm"
                                  value="-"
                                  onClick={() =>
                                    updateBasket(
                                      index,
                                      basketQuantities[index] > 1
                                        ? basketQuantities[index] - 1
                                        : 1
                                    )
                                  }
                                  /*
async (index, q) => { 
  // put
  
  setBasketQuantities(basketQuantities.map((item, index2) => {
                                        if (index === index2) {
                                          return q;
                                        }

                                        return item;
                                      }))

                                      updateBasket(index, basketQuantities[index] > 1
                                            ? basketQuantities[index] - 1
                                            : 1)
                                      }
                                    */
                                  // setBasketQuantities(
                                  //   basketQuantities.map((item, index2) => {
                                  //     if (index === index2) {
                                  //       return basketQuantities[index] > 1
                                  //         ? basketQuantities[index] - 1
                                  //         : 1;
                                  //     }

                                  //     return item;
                                  //   })
                                  // )
                                >
                                  -
                                </Button>
                              </InputGroupAddon>
                              <Input
                                size="sm"
                                value={basketQuantities[index]}
                                onChange={(e) => {
                                  const val = parseInt(e.target.value);
                                  updateBasket(index, isNaN(val) ? 1 : val);
                                  // setBasketQuantities(
                                  //   basketQuantities.map((item, index2) => {
                                  //     if (index === index2) {
                                  //       return isNaN(val) ? 1 : val;
                                  //     }
                                  //     return item;
                                  //   })
                                  // );
                                }}
                                style={{
                                  webkitAppearance: "none",
                                  margin: "0",
                                }}
                              />

                              <InputGroupAddon addonType="append">
                                <Button style={{color: "#fff",backgroundColor:"#011a00"}}
                                  size="sm"
                                  outline
                                  color="secondary"
                                  value="+"
                                  onClick={() =>
                                    updateBasket(
                                      index,
                                      basketQuantities[index] + 1
                                    )
                                  }
                                >
                                  +
                                </Button>
                              </InputGroupAddon>
                              <InputGroupAddon>
                                <Button style={{color: "#fff",backgroundColor:"#011a00"}}
                                  size="sm"
                                  outline
                                  color="secondary"
                                  onClick={() => deleteItem(index)}
                                >
                                  <ImBin />
                                </Button>
                              </InputGroupAddon>
                            </InputGroup>
                          </ButtonGroup>
                        </Col>
                      </Row>
                    </Container>
                  </li>
                ))}
              </ul>
            )}
            <Container>
              <Row style={{textAlign:"center", paddingTop:"20px"}}>
                <Col>
                  <a
                    href="/basket"
                    style={{
                      color: "#3A3F3F",
                      fontSize: "15px",
                      letterSpacing: "3px",
                      borderTopStyle: "solid"
                     

                    }}
                  >
                   check the basket
                  </a>
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
          </DropdownMenu>
        </Dropdown>
      </Nav>
    </Fragment>
  );
};

export default Basket;
