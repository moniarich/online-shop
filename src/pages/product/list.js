import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Container, Row, Col } from "reactstrap";
import List from "../../components/List";

const ProductsList = (props) => {
  console.log("props", props);
  const products = props.products;
  const count = props.count;
  const page =  props.page
  // if product is not null render product otherwise ""
  return (
    <React.Fragment>
      <Header />

      <Container>
        {products !== null && products.length > 0 ? (
          <Row>
            <Col>
              <List products={products} count={count} page={page}></List>
            </Col>
          </Row>
        ) : (
          "nie ma"
        )}
      </Container>

      <Footer />
    </React.Fragment>
  );
};

export async function getServerSideProps(context) {
  // Fetch data from external API

  const q = context.query.q;

  let response;
  const page = context.query.page || 1;

  if (q === undefined) {
    response = await fetch(
      `http://localhost:3000/api/products?q=${""}&page=${page}`
    );
  } else {
    response = await fetch(
      `http://localhost:3000/api/products?q=${q}&page=${page}`
    );
  }

  // read product info from response
  // if response.ok -> data = await.. otherwise data = null (assign value to data)
  const data = response.ok ? await response.json() : null;

  // Pass data to the page via props
  return {
    props: {
      products: data.products,
      count: data.count,
      page,
      searchTerm: context.query && context.query.q ? context.query.q : "",
    },
  };
}

export default ProductsList;
