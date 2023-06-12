import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../app/hook";
import { fetchProducts } from "../features/products/productsSlice";
import { addToCart } from "../features/cart/cartSlice";
import { MdAddShoppingCart } from "react-icons/md";
import Deal from "../assets/deal.png";
import ElectronicDeal from "../assets/electronic.png";
import JewelryDeal from "../assets/jewelry.png";
import ClothingDeal from "../assets/clothing.png";

const Home = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.products.data);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <main>
      <Container>
        <Row>
          <Col lg="12" className="mt-2 mb-2">
            <img
              src={Deal}
              alt="Back to School Deals"
              style={{ width: "100%", height: "auto" }}
            />
          </Col>
          <Col md="12" lg="5" className="border mt-2 mb-2">
            <Card className="h-100">
              <Link
                to={`/product/${data[0]?.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Card.Img
                  variant="top"
                  src={data[0]?.image}
                  style={{ height: "clamp(22vh, 20vh, 18vh)" }}
                />
              </Link>
              <Card.Body>
                <Card.Title>{data[0]?.title}TV</Card.Title>
                <Card.Text>{data[0]?.category}electronics</Card.Text>
                <Card.Text>{data[0]?.description}its a tv</Card.Text>
                <Row>
                  <Col className="d-flex justify-content-start align-items-center">
                    <Card.Subtitle>${data[0]?.price}10</Card.Subtitle>
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
          </Col>
          <Col md="12" lg="7" className="border mt-2 mb-2">
            <Col>
              <Row>
                {data?.map((product, i) => {
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
                    <Col xs="12" sm="6" md="4" xl="3" className="p-1" key={id}>
                      <Card className="h-100">
                        <Link
                          to={`/product/${id}`}
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          <Card.Img
                            variant="top"
                            src={image}
                            style={{ height: "clamp(22vh, 20vh, 18vh)" }}
                          />
                        </Link>
                        <Card.Body>
                          <Card.Title>
                            {title.length > 10
                              ? `${title.slice(0, 10)}...`
                              : title}
                          </Card.Title>
                          <Card.Text>
                            {category.length > 10
                              ? `${category.slice(0, 10)}...`
                              : category}
                          </Card.Text>
                          <Card.Subtitle>${price}</Card.Subtitle>
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
                            Add to Cart
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  );
                })}
              </Row>
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
