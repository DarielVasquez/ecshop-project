import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../app/hook";
import { fetchProducts } from "../features/products/productsSlice";
import { addToCart } from "../features/cart/cartSlice";
import { MdAddShoppingCart, MdErrorOutline } from "react-icons/md";
import Deal from "../assets/deal.png";
import ElectronicDeal from "../assets/electronic.png";
import JewelryDeal from "../assets/jewelry.png";
import ClothingDeal from "../assets/clothing.png";

const Home = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const data = useAppSelector((state) => state.products.data);
  const loading = useAppSelector((state) => state.products.loading);
  const error = useAppSelector((state) => state.products.error);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <main>
      <Container>
        <Row>
          <Col lg="12" className="mt-2 mb-2">
            <Link to={`/category/men's clothing`} className="link-underline">
              <img
                src={Deal}
                alt="Back to School Deals"
                style={{ width: "100%", height: "auto" }}
              />
            </Link>
          </Col>
          <Col md="12" lg="5" className="mt-2 mb-2">
            {loading ? (
              <div className="d-flex justify-content-center">
                <Spinner animation="border" role="status" variant="secondary">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            ) : error ? (
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ gap: "5px" }}
              >
                <MdErrorOutline></MdErrorOutline>
                Error loading content
              </div>
            ) : (
              <Card className="h-100">
                <Link to={`/product/${data[0]?.id}`} className="link-underline">
                  <Card.Img
                    variant="top"
                    src={data[0]?.image}
                    className="mt-3 mb-3"
                    style={{ height: "clamp(40vh, 30vh, 20vh)" }}
                  />
                </Link>
                <Card.Body>
                  <Card.Title>{data[0]?.title}</Card.Title>
                  <Link
                    to={`/category/${data[0]?.category}`}
                    className="link-underline"
                  >
                    <Card.Text className="text-capitalize">
                      {data[0]?.category}
                    </Card.Text>
                  </Link>
                  <Card.Text className="mt-4 mb-4">
                    {data[0]?.description}
                  </Card.Text>
                  <Row className="mt-5">
                    <Col className="d-flex justify-content-start align-items-center">
                      <Card.Subtitle>${data[0]?.price}</Card.Subtitle>
                    </Col>
                    <Col className="d-flex justify-content-end align-items-center">
                      <Button
                        variant="secondary"
                        onClick={() =>
                          dispatch(
                            addToCart({
                              ...data[0],
                              amount: 1,
                              total: data[0].price,
                            })
                          )
                        }
                      >
                        <MdAddShoppingCart className="icons-size"></MdAddShoppingCart>
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            )}
          </Col>
          <Col md="12" lg="7" className="mt-2 mb-2">
            <Col>
              {loading ? (
                <div className="d-flex justify-content-center">
                  <Spinner animation="border" role="status" variant="secondary">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
              ) : error ? (
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{ gap: "5px" }}
                >
                  <MdErrorOutline></MdErrorOutline>
                  Error loading content
                </div>
              ) : (
                <Row>
                  {data?.slice(1, 7).map((product, i) => {
                    const {
                      category,
                      description,
                      id,
                      price,
                      rating,
                      image,
                      title,
                    } = product;
                    return (
                      <Col xs="12" sm="6" md="4" className="p-1" key={id}>
                        <Card className="h-100">
                          <Link
                            to={`/product/${id}`}
                            className="link-underline"
                          >
                            <Card.Img
                              variant="top"
                              src={image}
                              className="mt-1"
                              style={{ height: "clamp(20vh, 18vh, 15vh)" }}
                            />
                          </Link>
                          <Card.Body>
                            <Card.Title
                              style={{
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {title}
                            </Card.Title>
                            <Link
                              to={`/category/${category}`}
                              className="link-underline"
                            >
                              <Card.Text className="text-capitalize">
                                {category}
                              </Card.Text>
                            </Link>
                            <Row>
                              <Col className="d-flex justify-content-start align-items-center">
                                <Card.Subtitle>${price}</Card.Subtitle>
                              </Col>
                              <Col className="d-flex justify-content-end align-items-center">
                                <Button
                                  variant="secondary"
                                  onClick={() =>
                                    dispatch(
                                      addToCart({
                                        ...product,
                                        amount: 1,
                                        total: data[i].price,
                                      })
                                    )
                                  }
                                >
                                  <MdAddShoppingCart className="icons-size"></MdAddShoppingCart>
                                </Button>
                              </Col>
                            </Row>
                          </Card.Body>
                        </Card>
                      </Col>
                    );
                  })}
                </Row>
              )}
            </Col>
          </Col>
        </Row>
        <Row>
          <Col md="4" className="mt-2 mb-2">
            <Link to={"/category/electronics"}>
              <img
                src={ElectronicDeal}
                alt="Electronics"
                style={{ width: "100%", height: "auto" }}
              />
            </Link>
          </Col>
          <Col md="4" className="mt-2 mb-2">
            <Link to={"/category/jewelery"}>
              <img
                src={JewelryDeal}
                alt="Jewelry"
                style={{ width: "100%", height: "auto" }}
              />
            </Link>
          </Col>
          <Col md="4" className="mt-2 mb-2">
            <Link to={"/category/men's clothing"}>
              <img
                src={ClothingDeal}
                alt="Clothing"
                style={{ width: "100%", height: "auto" }}
              />
            </Link>
          </Col>
        </Row>
        <Row>
          <Col lg="12" className="border mt-2 mb-2">
            <div style={{ height: "1000px" }}>6</div>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default Home;
