import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchCart, removeItemFromCart } from "../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar";
import { FaMinus, FaPlus, FaTrashAlt } from "react-icons/fa";
import Lottie from "react-lottie";
import emptyCartAnimation from "../animations/empty-cart.json";

export default function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const response = await dispatch(fetchCart());
        if (fetchCart.fulfilled.match(response)) {
          setCart(response.payload);
        }
      } catch (err) {
        setError("Failed to fetch cart data.");
      } finally {
        setLoading(false);
      }
    };
    loadCart();
  }, [dispatch]);

  const handleRemoveItem = async (cartItemId) => {
    try {
      const response = await dispatch(removeItemFromCart(cartItemId));
      if (removeItemFromCart.fulfilled.match(response)) {
        setCart(response.payload);
      }
    } catch (err) {
      setError("Failed to remove item from the cart.");
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <p className="text-danger text-center mt-4">{error}</p>;
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div>
        <Navbar />
        <div className="d-flex flex-column align-items-center justify-content-center vh-100">
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: emptyCartAnimation,
            }}
            height={200}
            width={200}
          />
          <h3 className="text-muted mt-3">Your cart is empty!</h3>
        </div>
      </div>
    );
  }

  const totalAmount = cart.items.reduce(
    (sum, item) =>
      sum +
      item.quantity * item.options.reduce((total, opt) => total + opt.price, 0),
    0
  );

  return (
    <div>
      <Navbar />
      <section className="h-100 bg-light py-5">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-8">
              <h3 className="mb-4 text-center fw-bold">Your Shopping Cart</h3>
              {cart.items.map((item) => (
                <div className="card shadow-sm mb-3 border-0" key={item._id}>
                  <div className="card-body p-4 d-flex align-items-center">
                    <img
                      src={item.img || "https://via.placeholder.com/150"}
                      className="img-fluid rounded me-4"
                      alt={item.foodItem.name}
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "cover",
                      }}
                    />
                    <div className="flex-grow-1">
                      <h5 className="fw-bold mb-1">{item.foodItem.name}</h5>
                      <p className="mb-1 text-muted">
                        Options:{" "}
                        {item.options.map((opt) => opt.name).join(", ")}
                      </p>
                      <h6 className="fw-semibold">
                        {item.quantity *
                          item.options.reduce(
                            (sum, opt) => sum + opt.price,
                            0
                          )}{" "}
                        PKR
                      </h6>
                    </div>
                    <div className="d-flex align-items-center">
                      <button
                        className="btn btn-outline-secondary btn-sm mx-1"
                        onClick={() => handleRemoveItem(item._id)}
                      >
                        <FaMinus />
                      </button>
                      <span className="mx-2 fw-bold">{item.quantity}</span>
                      <button className="btn btn-outline-secondary btn-sm mx-1">
                        <FaPlus />
                      </button>
                      <button
                        className="btn btn-outline-danger btn-sm ms-3"
                        onClick={() => handleRemoveItem(item._id)}
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="card shadow-sm border-0">
                <div className="card-body text-center p-4">
                  <h5 className="fw-bold mb-3">
                    Total Amount: {totalAmount} PKR
                  </h5>
                  <button
                    className="btn btn-warning fw-bold px-4 py-2"
                    onClick={() =>
                      navigate("/checkout", { state: { totalAmount } })
                    }
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
