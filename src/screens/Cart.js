import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchCart, removeItemFromCart } from "../redux/slices/cartSlice";

export default function CartPage() {
  const dispatch = useDispatch();
  const [cart, setCart] = useState(null); // Local state for cart data
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
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <p className="text-danger text-center">{error}</p>;
  }

  return (
    <section className="h-100 h-custom" style={{ backgroundColor: "#d2c9ff" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12">
            <div
              className="card card-registration card-registration-2"
              style={{ borderRadius: "15px" }}
            >
              <div className="card-body p-0">
                <div className="row g-0">
                  {/* Cart Items Section */}
                  <div className="col-lg-8">
                    <div className="p-5">
                      <div className="d-flex justify-content-between align-items-center mb-5">
                        <h1 className="fw-bold mb-0">GoEat Cart</h1>
                        <h6 className="mb-0 text-muted">
                          {cart?.items.length} items
                        </h6>
                      </div>
                      <hr className="my-4" />

                      {/* Map Cart Items */}
                      {cart.items.map((item) => (
                        <div
                          className="row mb-4 d-flex justify-content-between align-items-center"
                          key={item._id}
                        >
                          <div className="col-md-2 col-lg-2 col-xl-2">
                            <img
                              src={
                                item.img || "https://via.placeholder.com/150"
                              }
                              className="img-fluid rounded-3"
                              alt={item.foodItem.name}
                            />
                          </div>
                          <div className="col-md-3 col-lg-3 col-xl-3">
                            <h6 className="text-muted">
                              {item.foodItem.category}
                            </h6>
                            <h6 className="mb-0">{item.foodItem.name}</h6>
                          </div>
                          <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                            <button
                              className="btn btn-link px-2"
                              onClick={() => handleRemoveItem(item._id)}
                            >
                              <i className="fas fa-minus text-danger"></i>{" "}
                              {/* Bootstrap text-danger makes it red */}
                            </button>

                            <input
                              min="0"
                              name="quantity"
                              value={item.quantity}
                              type="number"
                              readOnly
                              className="form-control form-control-sm"
                            />

                            <button className="btn btn-link px-2">
                              <i className="fas fa-plus"></i>
                            </button>
                          </div>
                          <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                            <h6 className="mb-0">
                              {item.quantity *
                                item.options.reduce(
                                  (sum, opt) => sum + opt.price,
                                  0
                                )}{" "}
                              PKR
                            </h6>
                          </div>
                          <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                            <button
                              className="btn btn-link text-danger"
                              onClick={() => handleRemoveItem(item._id)}
                            >
                              <i className="fas fa-times"></i>
                            </button>
                          </div>
                        </div>
                      ))}

                      <hr className="my-4" />

                      <div className="pt-5">
                        <h6 className="mb-0">
                          <a href="/" className="text-body">
                            <i className="fas fa-long-arrow-alt-left me-2"></i>
                            Back to Home
                          </a>
                        </h6>
                      </div>
                    </div>
                  </div>

                  {/* Summary Section */}
                  <div className="col-lg-4 bg-light">
                    <div className="p-5">
                      <h3 className="fw-bold mb-5 mt-2 pt-1">Summary</h3>
                      <hr className="my-4" />

                      <div className="d-flex justify-content-between mb-4">
                        <h5 className="text-uppercase">
                          Items {cart?.items.length}
                        </h5>
                        <h5>{cart.totalPrice} PKR</h5>
                      </div>

                      <h5 className="text-uppercase mb-3">Shipping</h5>

                      <div className="mb-4 pb-2">
                        <select className="form-select">
                          <option value="1">Standard Delivery - 100 PKR</option>
                          <option value="2">Express Delivery - 200 PKR</option>
                        </select>
                      </div>

                      <h5 className="text-uppercase mb-3">Promo Code</h5>

                      <div className="mb-5">
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="Enter your code"
                        />
                      </div>

                      <hr className="my-4" />

                      <div className="d-flex justify-content-between mb-5">
                        <h5 className="text-uppercase">Total Price</h5>
                        <h5>{cart.totalPrice + 100} PKR</h5>{" "}
                        {/* Add shipping fee */}
                      </div>

                      <button className="btn btn-dark btn-block btn-lg">
                        Checkout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
