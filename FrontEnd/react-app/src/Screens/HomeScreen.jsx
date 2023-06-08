import { useEffect } from "react";
import productListAction from "../Actions/productsAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Components/Loader";
import Error from "../Components/Error";
import styles from "./HomeScreen.module.css";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import LinkIcon from "@mui/icons-material/Link";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import MultiGridCarousel from "../Components/Caraousel";

function Home() {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.productList);
  const { loading, error, products } = allProducts;
  useEffect(() => {
    dispatch(productListAction());
    console.log("Hello");
  }, [dispatch]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Error variant="danger" children={error} />
      ) : (
        <div className="home">
          <div className={styles.button_Navbar}>
            <button className={styles.nav_Button}>
              Tote Bags &nbsp;
              <ShoppingBagIcon fontSize="large" />
            </button>
            <button className={styles.nav_Button}>
              Bracelets &nbsp;
              <LinkIcon fontSize="large" />
            </button>
          </div>{" "}
          <img
            className={styles.main_Image}
            src="https://cdn.pixabay.com/photo/2023/05/19/18/07/bee-8005091_1280.jpg"
            alt="Main Img"
          ></img>
          <div className="bag_Section">
            <h3>
              Tote Bag Collection&nbsp;
              <ArrowForwardIcon fontSize="large" />
            </h3>
            {/* <Row>
              {products.map((product) => {
                return (
                  <Col key={product._id} md={3}>
                    <ProductCard productDetails={product} />
                  </Col>
                );
              })}
            </Row> */}
            <MultiGridCarousel products={products} />
          </div>
          <img
            className={styles.main_Image}
            src="https://cdn.pixabay.com/photo/2023/05/19/18/07/bee-8005091_1280.jpg"
            alt="Main Img"
          ></img>
          <div className="bracelet_Section">
            <h3>
              Bracelet Collection&nbsp;
              <ArrowForwardIcon fontSize="large" />
            </h3>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
