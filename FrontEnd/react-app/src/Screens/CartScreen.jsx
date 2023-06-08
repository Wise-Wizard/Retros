import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addToCart, removeFromCart } from "../Actions/cartAction";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Form,
  Button,
  Card,
  Image,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { Link } from "react-router-dom";

function Cart() {
  const { id } = useParams();
  const Quantity = useLocation().search;
  const Navigate = useNavigate();
  const qty = Number(Quantity.split("=")[1]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, id, qty]);

  const { cartItems } = useSelector((state) => state.cart);
  console.log(cartItems);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  function checkout() {
    Navigate(`/login?redirect=/shipping`);
  }
  return (
    <>
      <Row>
        <Col md={8}>
          <h1>Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <div>
              {" "}
              <h1>Your Cart is Empty!</h1>
              <h3>
                <Link to="/">Go Back</Link>
              </h3>
            </div>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroupItem>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item.product}`}>
                        <h4>{item.name}</h4>
                      </Link>
                    </Col>
                    <Col md={2}>
                      <h5>${item.price}</h5>
                    </Col>
                    <Col md={2}>
                      <Form.Control
                        as="select"
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        }
                        size="lg"
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeFromCartHandler(item.product)}
                        className="delete"
                      >
                        <i
                          className="fa fa-trash text-danger"
                          aria-hidden="true"
                        ></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroupItem>
              ))}
            </ListGroup>
          )}
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroupItem>
                <h2>
                  Total Amount: $
                  {cartItems
                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toFixed(2)}
                </h2>
                <h2>
                  ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                  Products
                </h2>
              </ListGroupItem>
              <div class="text-center">
                <Button
                  type="button"
                  className="batman"
                  disabled={cartItems.length === 0}
                  onClick={checkout}
                >
                  <span>Checkout</span>
                </Button>
              </div>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Cart;
