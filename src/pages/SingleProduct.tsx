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
import { useParams, useNavigate, Link } from "react-router-dom";
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
    if (!data.length) {
      dispatch(fetchProducts());
    }
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      dispatch(fetchCategoryProducts(data[Number(id)]?.category));
    }
  }, [data, id]);

  return (
    <main>
      <Container>
        <Card>
          <Row>
            <Col className="text-capitalize">
              <p className="ps-3 pt-3">
                Category:
                <Link
                  className="ps-2 link-underline"
                  to={`/category/${product?.category}`}
                >
                  {product?.category}
                </Link>
              </p>
            </Col>
          </Row>
          <Row className="p-3 p-md-5">
            <Col
              xs="12"
              xl="1"
              className="d-flex flex-row flex-xl-column justify-content-center order-xl-first"
              style={{ rowGap: "10px", columnGap: "10px" }}
            >
              {product &&
                Array.from(
                  {
                    length: 3,
                  },
                  (_, i) => (
                    <Image
                      src={product?.image}
                      rounded
                      className="border"
                      style={{
                        height: "clamp(5vh, 5em, 15vh)",
                        width: "clamp(5vw, 5em, 15vw)",
                        objectFit: "contain",
                        padding: "5px",
                        cursor: "pointer",
                      }}
                      key={i}
                    ></Image>
                  )
                )}
            </Col>
            <Col xs="12" lg="8" xl="7" className="order-first">
              <div className="d-flex justify-content-center pt-5 pb-5 product-img-container">
                {!product && !loading ? (
                  <div
                    className="d-flex justify-content-center align-items-center py-5 my-5"
                    style={{ gap: "5px" }}
                  >
                    <MdErrorOutline></MdErrorOutline>
                    Product not found
                  </div>
                ) : (
                  <img
                    src={product?.image}
                    alt={product?.title}
                    className="single-product-img"
                  />
                )}
              </div>
            </Col>
            <Col xs="12" lg="4" className="order-last order-lg-first pt-3">
              <Card className="p-3">
                {!product && !loading ? (
                  <div
                    className="d-flex justify-content-center align-items-center py-5 my-5"
                    style={{ gap: "5px" }}
                  >
                    <MdErrorOutline></MdErrorOutline>
                    Product not found
                  </div>
                ) : (
                  <div>
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
                      style={{ width: "100%" }}
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
                  </div>
                )}
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
              ) : categoryError || !product ? (
                <div
                  className="d-flex justify-content-center align-items-center p-5 m-5"
                  style={{ gap: "5px" }}
                >
                  <MdErrorOutline></MdErrorOutline>
                  Error loading content
                </div>
              ) : (
                <div
                  className="d-flex flex-row pb-3 m-5 mb-3 mt-3"
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
                        <Col xs="12" sm="6" md="4" lg="2" key={id}>
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
                  className="d-flex flex-row pb-3 m-5 mb-3 mt-3"
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
                        <Col xs="12" sm="6" md="4" lg="2" key={id}>
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
