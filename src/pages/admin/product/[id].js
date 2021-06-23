import React, { Fragment } from "react";
import { Badge } from "reactstrap";
import ProductForm from "../../../components/ProductForm";

const Post = (props) => {
  const product = props.product;

  // if product is not null render product otherwise ""
  return (
    <Fragment>
      <div>
       <h1 style={{
                textAlign: "center",
                color: "#011a00",
                fontFamily: "Roboto",
                marginTop:"2em",
                marginBottom:"2em"
              }}>Edit Product</h1>
     </div>
        <ProductForm
          product={product}
        />
      
    </Fragment>
  );
};

export async function getServerSideProps(context) {
  // Fetch data from external API
  const response = await fetch(
    `http://localhost:3000/api/product/${context.params.id}`
  );

  // read product info from response
  // if response.ok -> data = await.. otherwise data = null (assign value to data)
  const data = response.ok ? await response.json() : null;

  // Pass data to the page via props
  return { props: { product: data } };
}

export default Post;
