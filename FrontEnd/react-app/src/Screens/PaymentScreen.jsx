import React from "react";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { savePaymentMethod } from "../Actions/cartAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Payment() {
  const [paymentMethod, setPaymentMethod] = useState();
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!shippingAddress.address) {
    Navigate("/shipping");
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    Navigate("/placeorder");
  };

  return (
    <>
      <Form onSubmit={submitHandler}>
        <h1>Payment Method</h1>

        <Form.Label htmlFor="Paypal" className="label">
          <Form.Check
            type="radio"
            value="Paypal"
            id="Paypal"
            name="Payment"
            onChange={(e) => setPaymentMethod(e.target.value)}
          ></Form.Check>
          &nbsp; Paypal
        </Form.Label>

        <Form.Group>
          <Form.Label className="label">
            <Form.Check
              type="radio"
              value="Credit"
              id="Credit"
              name="Payment"
              onChange={(e) => {
                setPaymentMethod(e.target.value);
              }}
            ></Form.Check>
            &nbsp; Credit Card
          </Form.Label>
        </Form.Group>
        <Button
          style={{ width: "300px" }}
          type="submit"
          className="loginButton"
        >
          <span></span>
          <span></span>
          <span></span>
          <span></span> Continue
        </Button>
      </Form>
    </>
  );
}
export default Payment;
