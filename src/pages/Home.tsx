import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useAppSelector, useAppDispatch } from "../app/hook";
import { fetchProducts } from "../features/products/productsSlice";
import { addToCart } from "../features/cart/cartSlice";

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
          <Col md="12" lg="5" className="border">
            <Card className="h-100">
              <Card.Img
                variant="top"
                src={data[0]?.image}
                style={{ height: "clamp(22vh, 20vh, 18vh)" }}
              />
              <Card.Body>
                <Card.Title>{data[0]?.title}</Card.Title>
                <Card.Text>{data[0]?.category}</Card.Text>
                <Card.Text>{data[0]?.description}</Card.Text>
                <Card.Subtitle>${data[0]?.price}</Card.Subtitle>
                <Button
                  variant="secondary"
                  onClick={() =>
                    dispatch(
                      addToCart({ ...data[0], amount: 1, total: data[0].price })
                    )
                  }
                >
                  Add to Cart
                </Button>
              </Card.Body>
              <Card.Footer>
                Rating: {data[0]?.rating.rate} ({data[0]?.rating.count})
              </Card.Footer>
            </Card>
          </Col>
          <Col md="12" lg="7" className="border">
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
                        <Card.Img
                          variant="top"
                          src={image}
                          style={{ height: "clamp(22vh, 20vh, 18vh)" }}
                        />
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
                          <Card.Text>
                            {description.length > 40
                              ? `${description.slice(0, 40)}...`
                              : description}
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
                        <Card.Footer>
                          Rating: {rating.rate} ({rating.count})
                        </Card.Footer>
                      </Card>
                    </Col>
                  );
                })}
              </Row>
            </Col>
          </Col>
        </Row>
        <Row>
          <Col lg="12" className="border">
            2
          </Col>
        </Row>
        <Row>
          <Col lg="4" className="border">
            3
          </Col>
          <Col lg="4" className="border">
            4
          </Col>
          <Col lg="4" className="border">
            5
          </Col>
        </Row>
        <Row>
          <Col lg="12" className="border">
            <div style={{ height: "1000px" }}>6</div>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default Home;
