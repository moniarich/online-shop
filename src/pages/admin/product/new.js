import { Fragment, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Badge } from "reactstrap"
import React from "react";

import ProductForm from "../../../components/ProductForm";

const NewProduct = () => {
  return (
    <Fragment>
     <div>
       <h1 style={{textAlign:"center", marginTop:"50px", color:"#011a00", fontFamily:"Roboto"}}><Badge style={{backgroundColor:"#011a00", color:"#fff"}} >New Product</Badge></h1>
     </div>
      <ProductForm />
    </Fragment>
  )
};
export default NewProduct;
