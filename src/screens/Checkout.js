import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useDispatch } from "react-redux";
import { clearCart } from "../redux/slices/cartSlice";
import { Button, Form, Alert, Spinner } from "react-bootstrap";
import Navbar from "../component/Navbar";
import { motion } from "framer-motion";
import Lottie from "react-lottie";
import animationData from "../animations/payment-animation.json";

const Checkout = () => {
  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const totalAmount = location.state?.totalAmount || 0;
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/payment/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: totalAmount }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
      .catch(() => setError("Failed to initialize payment"));
  }, [totalAmount]);

  const handlePayment = async () => {
    setLoading(true);
    setError(null);

    if (!stripe || !elements) return;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card: elements.getElement(CardElement) },
    });

    if (result.error) {
      setError(result.error.message);
    } else {
      setSuccess(true);
      dispatch(clearCart());

      setTimeout(() => {
        navigate("/");
      }, 3000);
    }

    setLoading(false);
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return (
    <div>
      <Navbar />
      <div className="d-flex justify-content-center mt-4">
        <Lottie options={defaultOptions} height={200} width={200} />
      </div>
      <motion.div
        className="container mt-5 d-flex flex-column align-items-center bg-dark text-light p-5 rounded shadow-lg"
        style={{ maxWidth: "500px" }}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2
          className="fw-bold text-warning"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          Checkout
        </motion.h2>
        <motion.p className="fs-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          Total: <strong>{totalAmount} PKR</strong>
        </motion.p>

        <Form className="w-100">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Form.Group className="mb-3 p-3 bg-secondary rounded">
              <CardElement className="p-2 bg-dark text-light rounded" />
            </Form.Group>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="warning"
              onClick={handlePayment}
              className="mt-3 w-100 fw-bold shadow-sm"
              disabled={loading}
            >
              {loading ? <Spinner animation="border" size="sm" /> : "Pay Now"}
            </Button>
          </motion.div>
        </Form>

        {error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Alert variant="danger" className="mt-3 w-100 text-center">
              {error}
            </Alert>
          </motion.div>
        )}
        {success && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Alert variant="success" className="mt-3 w-100 text-center">
              Payment Successful! Redirecting...
            </Alert>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Checkout;
