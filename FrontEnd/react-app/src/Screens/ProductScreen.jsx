import React from "react";
import { Card } from "react-bootstrap";
import Rating from "../Components/Rating";
import { Link } from "react-router-dom";

function ProductCard(props) {
  return (
    <>
      <Card
        border="danger"
        style={{
          width: "18rem",
        }}
        className="my-3 p-3 rounded"
        bg="lightgrey"
      >
        <Link to={`/product/${props.productDetails._id}`}>
          <Card.Img src={props.productDetails.image} variant="top"></Card.Img>

          <Card.Body>
            <Card.Title as="div">
              <strong>{props.productDetails.name}</strong>
            </Card.Title>
            <Card.Text as="div">
              <div>{props.productDetails.price} $</div>
            </Card.Text>
            <Card.Text as="div">
              <Rating value={props.productDetails.rating}></Rating>
            </Card.Text>
          </Card.Body>
        </Link>
      </Card>
    </>
  );
}

export default ProductCard;
