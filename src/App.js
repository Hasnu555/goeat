import "./App.css";
import Home from "./screens/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp.js";
import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import CartPage from "./screens/Cart.js";
import AdminPanel from "./screens/AdminPanel";
import ProtectedRoute from "./component/ProtectedRoute";
import Checkout from "./screens/Checkout";
import { Elements } from "@stripe/react-stripe-js"; // Import Elements
import { loadStripe } from "@stripe/stripe-js"; // Import Stripe loader

// Initialize Stripe with your Publishable Key
const stripePromise = loadStripe("pk_test_51Qn1i2R7d3CmGusfMez264Kd1OQcR3UUCWLeSDFVVEJl4GY3YHqXI55DneS76499aaHycRInEhNbJy3HhPgOobme00LBodKPIP");

function App() {
  return (
    <Provider store={store}> {/* Wrap Redux Provider */}
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<SignUp />} />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <CartPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminPanel />
                </ProtectedRoute>
              }
            />
            {/* Wrap Checkout Route in <Elements> */}
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Elements stripe={stripePromise}>
                    <Checkout />
                  </Elements>
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
