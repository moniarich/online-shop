import React, { Fragment, useEffect, useState } from "react";
import {
  Col,
  Container,
  Row,
  Table,
  Alert,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { ImBin } from "react-icons/im";
import { RiEdit2Line } from "react-icons/ri";
import Header from "../components/Header";
import { useRouter } from "next/router";

const MainBasket = () => {
  const [basketItems, setBasketItems] = useState([]);
  const [message, setMessages] = useState({ type: "", text: "" });
  const [modal, setModal] = useState(false);
  const router = useRouter();

  const toggle = () => setModal(!modal);

  const goToPage = (index) => {
    document.location.href = `/checkoutpage`;
  };

  let sum = 0;

  basketItems.forEach((item) => {
    sum += item.quantity * item.price.value;
    console.log(sum);
  });
  
  

  useEffect(() => {
    fetchBasket();
  }, []);

  const deleteProduct = async (index) => {
    try {
      const response = await fetch(`/api/basket`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: basketItems[index].productId,
        }),
      });
      if (response.ok) {
        console.log("reloat");
        router.reload();
      } else {
        const data = await response.json();
        setMessages({ type: "danger", text: data.message });
      }
    } catch (e) {
      setMessages({ type: "danger", text: e.message });
    }
    console.log(basketItems[index].productId);
  };

  return (
    <Fragment>
      <Header />
      <Container>
        <Row style={{ paddingTop: "20px" }}>
          <Col>
            <h2
              style={{
                textAlign: "center",
                marginTop: "50px",
                color: "#011a00",
                fontFamily: "Roboto",
                paddingTop: "15px",
              }}
            >
              Basket products
            </h2>
            <Table hover style={{color:"#011a00", fontFamily:"Roboto"}}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>title</th>
                  <th>quantity</th>
                  <th>price</th>
                  <th>currency</th>
                  <th>actions</th>
                </tr>
              </thead>
              <tbody>
                {basketItems.map((item, index) => (
                  <tr key={index}>
                    <th scope="row" />
                    <td>{item.title}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price.value}</td>
                    <td>{item.price.currency}</td>
                    <td>
                      <div>
                        <Button size="sm" onClick={toggle} style={{color: "#fff",backgroundColor:"#011a00"}}>
                          <ImBin />
                        </Button>
                        <Modal isOpen={modal} toggle={toggle}>
                          <ModalHeader toggle={toggle}>
                            <ImBin />
                          </ModalHeader>
                          <ModalBody>
                            Are you sure you want to remove this product?
                          </ModalBody>
                          <ModalFooter>
                            <Button
                              color="primary"
                              onClick={() => {
                                toggle();
                                deleteProduct(index);
                              }}
                            >
                              Yes
                            </Button>{" "}
                            <Button color="secondary" onClick={toggle}>
                              Cancel
                            </Button>
                          </ModalFooter>
                        </Modal>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Row style={{ paddingTop: "20px", textAlign: "right" }}>
              <Col>
                <p style={{ paddingRight: "50px", fontFamily:"Roboto", color:"#011a00" }}>Pay : £ {sum}</p>

                <Button style={{backgroundColor:"#011a00"}} onClick={() => goToPage()}>Go to checkout</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};
// export async function getServerSideProps(context) {
//   const q = context.query.q;

//   // Fetch data from external API
//   const response = await fetch(`http://localhost:3000/api/basket?q=${q}`);

//   // read product info from response
//   // if response.ok -> data = await.. otherwise data = null (assign value to data)
//   const data = response.ok ? await response.json() : null;

//   // Pass data to the page via props
//   return { props: { basketItems: data } };

export default MainBasket;
