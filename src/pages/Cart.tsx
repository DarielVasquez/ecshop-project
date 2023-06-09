import React from "react";
import {
  Container,
  Card,
  Dropdown,
  Form,
  FormControl,
  Col,
  Row,
  Button,
  Badge,
  CloseButton,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../app/hook";
import {
  MdMenu,
  MdOutlineShoppingCart,
  MdOutlineSettings,
  MdShoppingBasket,
  MdAdd,
  MdRemove,
} from "react-icons/md";
import {
  addToCart,
  removeOneFromCart,
  removeItemFromCart,
} from "../features/cart/cartSlice";

const Cart = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const totalAmount = useAppSelector((state) => state.cart.totalAmount);
  const subtotalCost = useAppSelector((state) => state.cart.subtotalCost);
  const taxes = useAppSelector((state) => state.cart.taxes);
  const totalCost = useAppSelector((state) => state.cart.totalCost);
  return (
    <main>
      <Container>
        <Row>
          <Col xs="8">
            {cartItems?.map((item, i) => {
              const { id, title, amount, total, image } = item;
              return (
                <Container key={id}>
                  <Row>
                    <Col
                      xs="1"
                      className="d-flex align-items-center justify-content-center"
                      onClick={() => dispatch(removeItemFromCart(item))}
                    >
                      <CloseButton></CloseButton>
                    </Col>
                    <Col
                      xs="3"
                      sm="2"
                      className="d-flex align-items-center justify-content-center"
                    >
                      <img src={image} alt={title} className="cart-img" />
                    </Col>
                    <Col
                      sm="4"
                      className="d-sm-flex d-none align-items-center justify-content-center"
                      style={{ whiteSpace: "normal" }}
                    >
                      <span style={{ padding: "5px" }}>
                        {title.length > 60 ? `${title.slice(0, 60)}...` : title}
                      </span>
                    </Col>
                    <Col
                      xs="6"
                      sm="3"
                      className="d-flex align-items-center justify-content-center"
                    >
                      <Button
                        variant="success"
                        style={{
                          fontSize: "clamp(6px, 10px, 12px)",
                        }}
                        onClick={() => dispatch(addToCart(item))}
                      >
                        <MdAdd></MdAdd>
                      </Button>
                      <span className="p-2">{amount}</span>
                      <Button
                        variant="danger"
                        style={{
                          fontSize: "clamp(6px, 10px, 12px)",
                        }}
                        onClick={() => dispatch(removeOneFromCart(item))}
                      >
                        <MdRemove></MdRemove>
                      </Button>
                    </Col>
                    <Col
                      xs="1"
                      sm="2"
                      className="d-flex align-items-center justify-content-center"
                    >
                      <Row>
                        <span>${total}</span>
                      </Row>
                    </Col>
                  </Row>
                </Container>
              );
            })}
          </Col>
          <Col xs="4">
            <Card>
              <Card.Body>
                <Card.Title>Order Summary</Card.Title>
                <hr />
                <Card.Text>
                  Subtotal ({totalAmount} {totalAmount > 1 ? "items" : "item"}):
                  ${subtotalCost}
                </Card.Text>
                <Card.Text>Taxes: {taxes.toFixed(2)}</Card.Text>
                <Card.Text>Total: {totalCost.toFixed(2)}</Card.Text>
                <div className="d-flex justify-content-center">
                  <Button variant="secondary" className="w-100">
                    Proceed to Checkout
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default Cart;
