import React, { useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Image,
  Spinner,
} from "react-bootstrap";
import { useAppSelector, useAppDispatch } from "../app/hook";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProducts } from "../features/products/productsSlice";
import { addToCart } from "../features/cart/cartSlice";
import { Rating } from "../components";
import { MdAddShoppingCart, MdErrorOutline } from "react-icons/md";
import { fetchCategoryProducts } from "../features/categoryProducts/categoryProductsSlice";

const SingleProduct = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.products.data);
  const loading = useAppSelector((state) => state.products.loading);
  const error = useAppSelector((state) => state.products.error);
  const categoryProducts = useAppSelector(
    (state) => state.categoryProducts.data
  );
  const categoryLoading = useAppSelector(
    (state) => state.categoryProducts.loading
  );
  const categoryError = useAppSelector((state) => state.categoryProducts.error);
  const product = data[Number(id)];

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  useEffect(() => {
    dispatch(fetchCategoryProducts(product?.category));
  }, [product]);

  return (
    <main>
      <Container>
        <Card>
          <Row>
            <Col className="text-capitalize">
              <p className="ps-3 pt-3">
                Category:
                <span className="ps-2">{product?.category}</span>
              </p>
            </Col>
          </Row>
          <Row className="p-5">
            <Col xs="12" lg="1">
              <Image
                src={product?.image}
                rounded
                className="border"
                style={{
                  height: "100px",
                  width: "100px",
                  objectFit: "contain",
                  padding: "5px",
                }}
              ></Image>
            </Col>
            <Col xs="12" lg="7">
              <div
                style={{}}
                className="d-flex justify-content-center pt-5 pb-5"
              >
                <img
                  src={product?.image}
                  alt={product?.title}
                  className="single-product-img"
                />
              </div>
            </Col>
            <Col xs="12" lg="4">
              <Card className="p-3">
                <p className="fs-5" style={{ fontWeight: "600" }}>
                  {product?.title}
                </p>
                <Col className="d-flex flex-row pb-4">
                  <Rating rating={product?.rating.rate}></Rating>
                  <span className="rating-num">
                    ({product?.rating.rate}) {product?.rating.count} reviews
                  </span>
                </Col>
                <p className="fs-5">${product?.price}</p>
                <p>{product?.description}</p>
                <Button
                  variant="secondary"
                  onClick={() =>
                    dispatch(
                      addToCart({
                        ...product,
                        amount: 1,
                        total: product?.price,
                      })
                    )
                  }
                >
                  Add to cart
                </Button>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col className="text-capitalize">
              <p className="ps-5 pt-3">Similar Products:</p>
              {categoryLoading ? (
                <div className="d-flex justify-content-center p-5 m-5">
                  <Spinner animation="border" role="status" variant="secondary">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
              ) : categoryError ? (
                <div
                  className="d-flex justify-content-center align-items-center p-5 m-5"
                  style={{ gap: "5px" }}
                >
                  <MdErrorOutline></MdErrorOutline>
                  Error loading content
                </div>
              ) : (
                <div
                  className="d-flex flex-row ps-5 pb-3 m-5 mb-3 mt-3"
                  style={{ overflowX: "auto", gap: "10px" }}
                >
                  {categoryProducts
                    ?.filter((product) => product.id !== Number(id) + 1)
                    .map((product) => {
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
                        <Col xs="2" key={id}>
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
                    })}
                </div>
              )}
            </Col>
          </Row>
          <Row>
            <Col className="text-capitalize">
              <p className="ps-5 pt-3">Other Products:</p>
              {categoryLoading ? (
                <div className="d-flex justify-content-center p-5 m-5">
                  <Spinner animation="border" role="status" variant="secondary">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
              ) : categoryError ? (
                <div
                  className="d-flex justify-content-center align-items-center p-5 m-5"
                  style={{ gap: "5px" }}
                >
                  <MdErrorOutline></MdErrorOutline>
                  Error loading content
                </div>
              ) : (
                <div
                  className="d-flex flex-row ps-5 pb-3 m-5 mb-3 mt-3"
                  style={{ overflowX: "auto", gap: "10px" }}
                >
                  {data
                    ?.filter((product) => product.id !== Number(id) + 1)
                    .map((value) => ({ value, sort: Math.random() })) // Randomizes array
                    .sort((a, b) => a.sort - b.sort)
                    .map(({ value }) => value)
                    .slice(0, 8)
                    .map((product) => {
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
                        <Col xs="2" key={id}>
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
                    })}
                </div>
              )}
            </Col>
          </Row>
        </Card>
      </Container>
    </main>
  );
};

export default SingleProduct;
