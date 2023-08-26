import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Components/LoaderComponent/Loader";
import Error from "../../Components/Error";
import { Row, Col } from "react-bootstrap";
import ProductCard from "../ProductSection/ProductScreen";
import productListAction from "../../Actions/productsAction";

function ToteBagScreen() {
  const dispatch = useDispatch();
  const toteBagList = useSelector((state) => state.productList);
  const { loading, error, products } = toteBagList;
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
        <>
          <h1 className="welcome-heading">Tote Bags</h1>
          <Row>
            {products
              .filter((product) => product.category === "Tote Bag")
              .map((product) => (
                <Col key={product._id} md={3}>
                  <ProductCard productDetails={product} />
                </Col>
              ))}
          </Row>
        </>
      )}
    </>
  );
}
export default ToteBagScreen;
