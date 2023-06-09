import { useEffect } from "react";
import productListAction from "../../Actions/productsAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Components/LoaderComponent/Loader";
import Error from "../../Components/Error";
import styles from "./HomeScreen.module.css";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import LinkIcon from "@mui/icons-material/Link";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import MultiGridCarousel from "../../Components/HomeComponents/Caraousel";
import ImageScrollAnimation from "../../Components/HomeComponents/ImageComponent";
import { useNavigate } from "react-router-dom";

function Home() {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.productList);
  const { loading, error, products } = allProducts;
  const Navigate = useNavigate();
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
        <div className="home">
          <div className={styles.button_Navbar}>
            <button
              className={styles.nav_Button}
              onClick={() => Navigate("/product/totebags")}
            >
              Tote Bags &nbsp;
              <ShoppingBagIcon fontSize="large" />
            </button>
            <button
              className={styles.nav_Button}
              onClick={() => Navigate("/product/bracelets")}
            >
              Bracelets &nbsp;
              <LinkIcon fontSize="large" />
            </button>
          </div>{" "}
          <ImageScrollAnimation
            imageUrl={
              "https://cdn.pixabay.com/photo/2023/05/19/18/07/bee-8005091_1280.jpg"
            }
          />
          <div className="bag_Section">
            <h2 style={{ display: "flex", alignItems: "baseline" }}>
              Tote Bags
              <h5 style={{ marginLeft: "12px", verticalAlign: "baseline" }}>
                <a href="/product/totebags">See All Collection</a>
                <ArrowForwardIcon
                  fontSize="small"
                  style={{ marginLeft: "4px", verticalAlign: "baseline" }}
                />
              </h5>
            </h2>

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
          <ImageScrollAnimation
            imageUrl={
              "https://cdn.pixabay.com/photo/2023/05/27/12/20/eastern-spinebill-8021395_1280.jpg"
            }
          />
          <div className="bracelet_Section">
            <h2 style={{ display: "flex", alignItems: "baseline" }}>
              Bracelets
              <h5 style={{ marginLeft: "12px", verticalAlign: "baseline" }}>
                <a href="/product/bracelets">See All Collection</a>
                <ArrowForwardIcon
                  fontSize="small"
                  style={{ marginLeft: "4px", verticalAlign: "baseline" }}
                />
              </h5>
            </h2>
            <MultiGridCarousel products={products} />
          </div>
        </div>
      )}
    </>
  );
}
export default Home;
