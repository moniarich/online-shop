import React from "react";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
} from "reactstrap";

const trim = (yourString, maxLength) => {
  if (yourString.length > maxLength) {
    //trim the string to the maximum length
    let trimmedString = yourString.substr(0, maxLength);

    //re-trim if we are in the middle of a word and
    trimmedString = trimmedString.substr(
      0,
      Math.min(trimmedString.length, trimmedString.lastIndexOf(" "))
    );

    return trimmedString;
  }

  return yourString;
};

const ProductCard = (props) => {
  return (
    <Card > 
      <a href={`/product/${props.id}`}>
        <CardImg top width="300px" src={props.img} alt="Card image cap" />
        <CardBody>
          <CardTitle style={{ color: "#011a00" }} tag="h5">
            {props.title}
          </CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">
            {props.subtitle}
          </CardSubtitle>
          <CardText style={{ color: "#011a00" }}>
            {trim(props.description, 200)}...
          </CardText>
          <Button style={{backgroundColor:"#011a00"}}>Add to Basket</Button>
        </CardBody>
      </a>
    </Card>
  );
};

export default ProductCard;
