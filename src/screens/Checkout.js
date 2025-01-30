import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useDispatch } from "react-redux";
import { clearCart } from "../redux/slices/cartSlice"; // Import clearCart action
import { Button, Form, Alert } from "react-bootstrap";

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
            dispatch(clearCart()); // 🛒 Clear the cart after successful payment

            setTimeout(() => {
                navigate("/"); // Redirect to home or order success page
            }, 3000);
        }

        setLoading(false);
    };

    return (
        <div className="container mt-4">
            <h2>Checkout</h2>
            <p>Total: <strong>{totalAmount} PKR</strong></p>

            <Form>
                <Form.Group>
                    <CardElement />
                </Form.Group>

                <Button variant="success" onClick={handlePayment} className="mt-3 w-100" disabled={loading}>
                    {loading ? "Processing..." : "Pay Now"}
                </Button>
            </Form>

            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
            {success && <Alert variant="success" className="mt-3">Payment Successful! Redirecting...</Alert>}
        </div>
    );
};

export default Checkout;
