import React, { Fragment, useState } from "react";
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
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { ImBin } from "react-icons/im";
import { RiEdit2Line } from "react-icons/ri";
import { Button } from "reactstrap";
import { useRouter } from "next/router";

// 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

const ProductsList = (props) => {
  const products = props.products;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const [message, setMessages] = useState({ type: "", text: "" });

  const router = useRouter();

  const goToPage = (index) => {
    document.location.href = `/admin/product/${products[index].id}`;
  };

  const deleteProduct = async (index) => {
    try {
      const response = await fetch(`/api/product/${products[index].id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        router.reload();
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
      <Container>
        <Row>
          <Col>
            <h1
              style={{
                textAlign: "center",
                color: "#011a00",
                fontFamily: "Roboto",
                paddingTop: "15px",
              }}
            >
              Products Table
            </h1>
            <Table hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>id</th>
                  <th>title</th>
                  <th>description</th>
                  <th>img</th>
                  <th>inventory</th>
                  <th>price</th>
                  <th>actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((item, index) => (
                  <tr key={index}>
                    <th scope="row" />
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                    <td>{item.description}</td>
                    <td>{item.img}</td>
                    <td>{item.inventory}</td>
                    <td>{item.price}</td>
                    <td>
                      <Button
                        style={{
                          textAlign: "center",
                          backgroundColor: "#011a00",
                          fontFamily: "Roboto",
                        }}
                        size="sm"
                        onClick={() => goToPage(index)}
                      >
                        <RiEdit2Line />
                      </Button>
                      <div>
                        <Button
                          style={{
                            textAlign: "center",
                            backgroundColor: "#011a00",
                            fontFamily: "Roboto",
                          }}
                          size="sm"
                          onClick={toggle}
                        >
                          <ImBin />
                        </Button>
                        <Modal isOpen={modal} toggle={toggle}>
                          <ModalHeader
                            style={{
                              textAlign: "center",
                              marginTop: "50px",
                              color: "#011a00",
                              fontFamily: "Roboto",
                            }}
                            toggle={toggle}
                          >
                            <ImBin />
                          </ModalHeader>
                          <ModalBody
                            style={{ color: "#011a00", fontFamily: "Roboto" }}
                          >
                            Are you sure you want to remove this product?
                          </ModalBody>
                          <ModalFooter>
                            <Button
                              style={{
                                textAlign: "center",
                                backgroundColor: "#011a00",
                                fontFamily: "Roboto",
                              }}
                              onClick={() => {
                                toggle();
                                deleteProduct(index);
                              }}
                            >
                              Yes
                            </Button>{" "}
                            <Button
                              style={{
                                textAlign: "center",
                                backgroundColor: "#011a00",
                                fontFamily: "Roboto",
                              }}
                              onClick={toggle}
                            >
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
export async function getServerSideProps(context) {
  // Fetch data from external API

  const q = context.query.q;

  let response;

  if (q === undefined) {
    response = await fetch(`http://localhost:3000/api/products?q=${""}`);
  } else {
    response = await fetch(`http://localhost:3000/api/products?q=${q}`);
  }

  // read product info from response
  // if response.ok -> data = await.. otherwise data = null (assign value to data)
  const data = response.ok ? await response.json() : null;

  // Pass data to the page via props
  return {
    props: {
      products: data,
      searchTerm: context.query && context.query.q ? context.query.q : "",
    },
  };
}

export default ProductsList;
