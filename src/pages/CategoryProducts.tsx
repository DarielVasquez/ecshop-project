import React, { useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useAppSelector, useAppDispatch } from "../app/hook";
import { fetchCategoryProducts } from "../features/categoryProducts/categoryProductsSlice";
import { useParams } from "react-router-dom";

const CategoryProducts = () => {
  const { category } = useParams();
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.categoryProducts.data);

  useEffect(() => {
    dispatch(fetchCategoryProducts("electronics"));
  }, []);

  return (
    <main>
      <Container>
        <Row>{category}</Row>
      </Container>
    </main>
  );
};

export default CategoryProducts;
