import React from "react";
import Product from "../../components/Product";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const Post = (props) => {
  const product = props.product;

  // if product is not null render product otherwise ""
  return (
    <React.Fragment>
      <Header />
      {product !== null ? (
        <Product
          id={product.id}
          title={product.title}
          img={product.img}
          description={product.description}
          price={product.price}
        />
      ) : (
        ""
      )}
      <Footer />
    </React.Fragment>
  );
};

export async function getServerSideProps(context) {
  // Fetch data from external API
  const response = await fetch(
    `http://localhost:3000/api/product/${context.params.pid}`
  );

  // read product info from response
  // if response.ok -> data = await.. otherwise data = null (assign value to data)
  const data = response.ok ? await response.json() : null;

  // Pass data to the page via props
  return { props: { product: data } };
}

export default Post;
