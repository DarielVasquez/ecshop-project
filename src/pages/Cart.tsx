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
import { Link, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const totalAmount = useAppSelector((state) => state.cart.totalAmount);
  const subtotalCost = useAppSelector((state) => state.cart.subtotalCost);
  const taxes = useAppSelector((state) => state.cart.taxes);
  const totalCost = useAppSelector((state) => state.cart.totalCost);
  return (
    <main>
      <Container>
        <Row style={{ rowGap: "25px" }}>
          <Col xs="12" md="8">
            <Card className="p-2">
              {cartItems?.map((item, i) => {
                const { id, title, amount, total, image, price, category } =
                  item;
                return (
                  <Container key={id}>
                    <Row>
                      <Col
                        xs="12"
                        sm="4"
                        className="d-flex align-items-center justify-content-center p-2"
                      >
                        <img
                          src={image}
                          alt={title}
                          className="cart-img"
                          style={{
                            height: "clamp(12vh, 15vh, 18vh)",
                            width: "clamp(12vh, 15vh, 18vh)",
                            cursor: "pointer",
                          }}
                          onClick={() => navigate(`/product/${id - 1}`)}
                        />
                      </Col>
                      <Col
                        xs="6"
                        sm="4"
                        className="d-flex align-items-center p-2"
                        style={{ whiteSpace: "normal" }}
                      >
                        <Row>
                          <span
                            style={{
                              padding: "5px",
                              fontWeight: "500",
                              cursor: "pointer",
                            }}
                            onClick={() => navigate(`/product/${id - 1}`)}
                          >
                            {title}
                          </span>
                          <span
                            style={{ padding: "5px" }}
                            className="text-capitalize"
                          >
                            {category}
                          </span>
                          <span style={{ padding: "5px", fontWeight: "100" }}>
                            Each: ${price}
                          </span>
                          <span
                            style={{
                              padding: "5px",
                              cursor: "pointer",
                              color: "red",
                              width: "auto",
                            }}
                            onClick={() => dispatch(removeItemFromCart(item))}
                          >
                            Remove
                          </span>
                        </Row>
                      </Col>
                      <Col xs="6" sm="4" className="d-flex justify-content-end">
                        <Row>
                          <span
                            style={{ fontWeight: "600" }}
                            className="fs-5 d-flex justify-content-end pt-4"
                          >
                            $
                            {total !== price && amount === 1
                              ? price
                              : total.toFixed(2)}
                          </span>
                          <Col className="d-flex align-items-center justify-content-end pt-3 pb-3">
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
                        </Row>
                      </Col>
                      <hr />
                    </Row>
                  </Container>
                );
              })}
            </Card>
          </Col>
          <Col xs="12" md="4">
            <Card>
              <Card.Body>
                <Card.Title>Order Summary</Card.Title>
                <hr />
                <Card.Text>
                  Subtotal ({totalAmount} {totalAmount > 1 ? "items" : "item"}):
                  ${subtotalCost.toFixed(2)}
                </Card.Text>
                <Card.Text>Taxes: ${taxes.toFixed(2)}</Card.Text>
                <Card.Text>Total: ${totalCost.toFixed(2)}</Card.Text>
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
