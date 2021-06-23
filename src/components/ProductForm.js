import React, { Fragment, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Col,
  Container,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Alert,
} from "reactstrap";

const ProductForm = (props) => {
  const [product, setProduct] = useState({
    ...(props.product || {}),
  });

  const [message, setMessages] = useState({ type: "", text: "" });

  const updateProduct = async () => {
    try {
      const response = await fetch(`/api/product/${product.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        setMessages({ type: "success", text: "success" });
      } else {
        const data = await response.json();
        setMessages({ type: "danger", text: data.message });
      }
    } catch (e) {
      setMessages({ type: "danger", text: e.message });
    }
  };

  const createProduct = async () => {
    try {
      const response = await fetch(`/api/product`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.id);
        document.location.href = `/admin/product/${data.id}`;
        setMessages({ type: "success", text: "success" });
      } else {
        const data = await response.json();
        setMessages({ type: "danger", text: data.message });
      }
    } catch (e) {
      setMessages({ type: "danger", text: e.message });
    }
  };
  const uploadImage = async (formData) => {
    try {
      const res = await fetch("/api/product/image", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }
      setProduct({ ...product, img: data.path });
    } catch (e) {
      setMessages({ type: "danger", text: e.message });
    }
  };
  console.log(product);
  return (
    <Fragment>
      <Container>
        <Row>
          <Col>
            <Form style={{ padding: "5% 20% 5% 20%", color:"#011a11"}}>
              <FormGroup row>
                <Label for="text" sm={2}>
                  Title
                </Label>
                <Col sm={10}>
                  <Input
                  style={{color:"#011a00"}}
                    type="text"
                    name="title"
                    id="title"
                    placeholder="product title"
                    value={product.title}
                    onChange={(e) =>
                      setProduct({ ...product, title: e.target.value })
                    }
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="description" sm={2}>
                  Description
                </Label>
                <Col sm={10}>
                  <Input
                   style={{color:"#011a00"}}
                    type="textarea"
                    name="description"
                    id="description"
                    value={product.description}
                    onChange={(e) =>
                      setProduct({ ...product, description: e.target.value })
                    }
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="exampleFile" sm={2}>
                  File
                </Label>
                <Col sm={10}>
                  <Input
                   style={{color:"#011a00"}}
                    type="file"
                    name="file"
                    id="exampleFile"
                    onChange={(e) => {
                      const formData = new FormData();
                      formData.append("file", e.target.files[0]);

                      uploadImage(formData);
                    }}
                  />
                  <FormText style={{color:"#011a00"}}>
                    You can add a picture of the product
                  </FormText>
                  {product.img ? <img src={`${product.img}`} alt="" /> : ""}
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="price" sm={2}>
                  Price
                </Label>
                <Col sm={10}>
                  <Input
                    type="number"
                    min="0"
                    placeholder="price"
                    value={product.price}
                    onChange={(e) =>
                      setProduct({ ...product, price: e.target.value })
                    }
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label sm={2}>Quantity</Label>
                <Col sm={10}>
                  <Input
                   style={{color:"#011a00"}}
                    type="number"
                    min="0"
                    value={product.inventory}
                    onChange={(e) =>
                      setProduct({ ...product, inventory: e.target.value })
                    }
                    placeholder="quantity"
                  />
                </Col>
              </FormGroup>

              <FormGroup check row>
                <Col sm={{ size: 10, offset: 2 }}>
                  <Button style={{backgroundColor:"#011a00"}}
                    onClick={() =>
                      product.id === undefined
                        ? createProduct()
                        : updateProduct()
                    }
                  >
                    Submit
                  </Button>
                </Col>
              </FormGroup>
            </Form>
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

export default ProductForm;
