import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { listProducts } from "../actions/productActions";
import Loader from "../components/Loader";
import ServerError from "../errors/ServerError";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";

const HomeScreen = ({ match: { params } }) => {
  const keyword = params.keyword || "";

  const pageNumber = params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, pages, page } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ServerError error={error} />;
  }

  return (
    <>
      <Meta />
      {!keyword ? (
        <>
          <ProductCarousel />
          <h1 style={{ marginTop: "30px" }}>Latest Products</h1>
        </>
      ) : (
        <>
          <Link to="/" className="btn btn-light">
            Go Back
          </Link>
          <h1>Product(s) related to {`"${params.keyword}"`} searched</h1>
        </>
      )}
      <Row>
        {products.map((product) => {
          return (
            <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
              <Product product={product} />
            </Col>
          );
        })}
      </Row>
      <Paginate pages={pages} page={page} keyword={keyword ? keyword : ""} />
    </>
  );
};

export default HomeScreen;
