import React, { useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Accordion,
} from "react-bootstrap";
import { useAppSelector, useAppDispatch } from "../app/hook";
import { fetchCategoryProducts } from "../features/categoryProducts/categoryProductsSlice";
import { Link, useParams, useNavigate } from "react-router-dom";
import { MdAddShoppingCart, MdErrorOutline } from "react-icons/md";
import { Rating } from "../components";

const CategoryProducts = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.categoryProducts.data);
  const loading = useAppSelector((state) => state.categoryProducts.loading);
  const error = useAppSelector((state) => state.categoryProducts.error);
  const categories = useAppSelector((state) => state.categories.data);

  useEffect(() => {
    if (category) {
      dispatch(fetchCategoryProducts(category));
    }
  }, [category]);

  return (
    <main>
      <Container>
        <Card className="p-5">
          <Row>
            <Col xs="12" md="3">
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Categories</Accordion.Header>
                  <Accordion.Body>
                    {categories?.map((cat, i) => {
                      return (
                        <Link
                          className="text-capitalize link-underline"
                          to={`/category/${cat}`}
                        >
                          {cat}
                          <br />
                        </Link>
                      );
                    })}
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Col>
            <Col xs="12" md="9">
              <Row>
                {loading ? (
                  <div className="d-flex justify-content-center">
                    <Spinner
                      animation="border"
                      role="status"
                      variant="secondary"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  </div>
                ) : error || products.length === 0 ? (
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ gap: "5px" }}
                  >
                    <MdErrorOutline></MdErrorOutline>
                    Error loading content
                  </div>
                ) : (
                  products?.map((product) => {
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
                      <Col xs="12" sm="6" md="4" lg="3" key={id}>
                        <Row>
                          <div className="d-flex justify-content-center pt-3 pb-3">
                            <img
                              src={image}
                              alt={title}
                              className="category-product-img"
                              onClick={() => navigate(`/product/${id - 1}`)}
                            />
                          </div>
                          <p style={{ fontWeight: "600", fontSize: "18px" }}>
                            ${price}
                          </p>
                          <p>{title}</p>
                          <Col className="d-flex flex-row">
                            <Rating rating={rating.rate}></Rating>
                            <span className="d-flex align-items-center rating-num">
                              {rating.count}
                            </span>
                          </Col>
                        </Row>
                      </Col>
                    );
                  })
                )}
              </Row>
            </Col>
          </Row>
        </Card>
      </Container>
    </main>
  );
};

export default CategoryProducts;
