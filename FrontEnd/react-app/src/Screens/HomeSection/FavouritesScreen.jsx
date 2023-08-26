import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFavourites } from "../../Actions/favouritesAction";
import productListAction from "../../Actions/productsAction";
import Loader from "../../Components/LoaderComponent/Loader";
import Error from "../../Components/Error";
import { Row, Col } from "react-bootstrap";
import ProductCard from "../ProductSection/ProductScreen";
import { Link } from "react-router-dom";

function FavouritesScreen() {
  const dispatch = useDispatch();
  const favProducts = useSelector((state) => state.userFavourites);
  const allProducts = useSelector((state) => state.productList);
  const { products } = allProducts;
  const { loading, error, userFav } = favProducts;

  useEffect(() => {
    console.log("Dispatched");
    dispatch(getFavourites());
    dispatch(productListAction());
  }, [dispatch]);

  if (loading) {
    return <Loader />; // Display Loader while loading
  }

  if (error || !userFav || !products) {
    return <Error variant="danger" children={error} />; // Display Error component if there is an error or if data is not available
  }

  const favouriteProducts = products.filter((product) => {
    return userFav.favourites.includes(product._id);
  });

  if (favouriteProducts.length === 0) {
    return (
      <>
        <h1>You have no favourites!</h1>
        <Link to="/">
          <h2>Go Back</h2>
        </Link>{" "}
        {/* Add a link to go back */}
      </>
    );
  }

  return (
    <>
      <h1 className="welcome-heading">Your Picks</h1>
      <Row>
        {favouriteProducts.map((product) => (
          <Col key={product._id} md={3}>
            <ProductCard productDetails={product} />
          </Col>
        ))}
      </Row>
    </>
  );
}

export default FavouritesScreen;
