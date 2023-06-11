import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Components/Loader";
import Error from "../../Components/Error";
import { Row, Col } from "react-bootstrap";
import ProductCard from "../ProductSection/ProductScreen";
import productListAction from "../../Actions/productsAction";

function BraceletScreen() {
  const dispatch = useDispatch();
  const braceletList = useSelector((state) => state.productList);
  const { loading, error, products } = braceletList;
  useEffect(() => {
    dispatch(productListAction());
  }, [dispatch]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Error variant="danger" children={error} />
      ) : (
        <Row>
          {products.map((product) => {
            return (
              <Col key={product._id} md={3}>
                <ProductCard productDetails={product} />
              </Col>
            );
          })}
        </Row>
      )}
    </>
  );
}
export default BraceletScreen;
