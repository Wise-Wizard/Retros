import Footer from "./Components/Footer.jsx";
import Header from "./Components/Header";
import { Container } from "react-bootstrap";
import Home from "./Screens/HomeSection/HomeScreen.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductPage from "./Screens/ProductSection/ProductDetails";
import Cart from "./Screens/CartSection/CartScreen.jsx";
import LoginScreen from "./Screens/ProfileSection/LoginScreen.jsx";
import RegisterScreen from "./Screens/ProfileSection/RegisterScreen.jsx";
import ProfileScreen from "./Screens/ProfileSection/ProfileScreen.jsx";
import ShippingScreen from "./Screens/PaymentSection/ShippingScreen.jsx";
import Payment from "./Screens/PaymentSection/PaymentScreen.jsx";
import PlaceOrderScreen from "./Screens/PaymentSection/PlaceOrderScreen.jsx";
// import Spline from "@splinetool/react-spline";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Container>
          {/* <Spline scene="https://prod.spline.design/ufgec588jlu77XD9/scene.splinecode" /> */}
          <Routes>
            <Route path="/" element={<Home />} exact />
            <Route path="/register" element={<RegisterScreen />} exact />
            <Route path="/login" element={<LoginScreen />} exact />
            <Route path="/profile" element={<ProfileScreen />} exact />
            <Route path="/product/:id" element={<ProductPage />} exact />
            <Route path="/cart/:id?" element={<Cart />} exact />
            <Route path="/shipping" element={<ShippingScreen />} exact />
            <Route path="/payment" element={<Payment />} exact />
            <Route path="/placeorder" element={<PlaceOrderScreen />} exact />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
