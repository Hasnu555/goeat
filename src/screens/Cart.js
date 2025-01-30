import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchCart, removeItemFromCart } from "../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Navbar from "../component/Navbar";
import { FaMinus, FaPlus, FaTrashAlt } from "react-icons/fa"; 

export default function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // For navigation
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
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <p className="text-danger text-center">{error}</p>;
  }

  // Calculate total amount
  const totalAmount = cart.items.reduce((sum, item) => sum + item.quantity * item.options.reduce((total, opt) => total + opt.price, 0), 0);

  return (
    <div>
      <Navbar />
      <section className="h-100">
        <div className="container h-100 py-5">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-10">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="fw-normal mb-0">Shopping Cart</h3>
              </div>

              {/* Map Cart Items */}
              {cart.items.map((item) => (
                <div className="card rounded-3 mb-4" key={item._id}>
                  <div className="card-body p-4">
                    <div className="row d-flex justify-content-between align-items-center">
                      <div className="col-md-2 col-lg-2 col-xl-2">
                        <img
                          src={item.img || "https://via.placeholder.com/150"}
                          className="img-fluid rounded-3"
                          alt={item.foodItem.name}
                        />
                      </div>
                      <div className="col-md-3 col-lg-3 col-xl-3">
                        <p className="lead fw-normal mb-2">{item.foodItem.name}</p>
                        <p>
                          <span className="text-muted">Options: </span>
                          {item.options.map((opt) => `${opt.name}`).join(", ")}
                        </p>
                      </div>
                      <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                        <button className="btn btn-link px-2" onClick={() => handleRemoveItem(item._id)}>
                          <FaMinus />
                        </button>
                        <input id="form1" min="0" name="quantity" value={item.quantity} type="number" readOnly className="form-control form-control-sm" />
                        <button className="btn btn-link px-2">
                          <FaPlus />
                        </button>
                      </div>
                      <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                        <h5 className="mb-0">{item.quantity * item.options.reduce((sum, opt) => sum + opt.price, 0)} PKR</h5>
                      </div>
                      <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                        <button className="btn btn-link text-danger" onClick={() => handleRemoveItem(item._id)}>
                          <FaTrashAlt />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Proceed to Pay Section */}
              <div className="card">
                <div className="card-body d-flex justify-content-center">
                  <button type="button" className="btn btn-warning btn-lg" onClick={() => navigate("/checkout", { state: { totalAmount } })}>
                    Proceed to Pay ({totalAmount} PKR)
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
