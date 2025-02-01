import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import {
  Card as BootstrapCard,
  Button,
  Form,
  Alert,
  Spinner,
} from "react-bootstrap";
import { FaShoppingCart, FaCog, FaPlus, FaMinus } from "react-icons/fa";

export default function CardComponent({ foodItems }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { name, img, description, options } = foodItems;

  const [selectedOption, setSelectedOption] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  const handleAddToCart = () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
      return;
    }

    if (!selectedOption) {
      setError("Please select an option.");
      return;
    }

    const option = options.find((opt) => opt.name === selectedOption);

    if (!option) {
      setError("Selected option is invalid.");
      return;
    }
    dispatch(
      addItemToCart({
        foodItemId: foodItems._id,
        quantity: quantity,
        options: {
          name: option.name,
          price: option.price,
        },
        img: img,
      })
    );

    setSuccess(true);

    setSelectedOption("");
    setQuantity(1);
    setError(null);

    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };

  return (
    <BootstrapCard className="mt-3 shadow-lg border-0" style={{ width: "95%", maxHeight: "560px" }}>
      <BootstrapCard.Img
        variant="top"
        src={img}
        alt={name}
        className="rounded-top"
        style={{ height: "200px", objectFit: "cover" }}
      />
      <BootstrapCard.Body>
        <BootstrapCard.Title className="fw-bold text-center">{name}</BootstrapCard.Title>
        <BootstrapCard.Text className="text-muted text-center">{description}</BootstrapCard.Text>

        <Form.Group controlId={`optionSelect-${foodItems._id}`} className="mb-3">
          <Form.Select value={selectedOption} onChange={handleOptionChange} className="shadow-sm">
            <option value="" disabled>
              Select an Option
            </option>
            {options.map((option, index) => (
              <option key={index} value={option.name}>
                {option.name} - {option.price} PKR
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group controlId={`quantitySelect-${foodItems._id}`} className="mb-3">
          <Form.Label className="fw-semibold">Quantity</Form.Label>
          <div className="d-flex align-items-center justify-content-center">
            <Button
              variant="outline-secondary"
              onClick={() => setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1))}
            >
              <FaMinus />
            </Button>

            <Form.Control
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
              className="text-center mx-2 shadow-sm"
              style={{ width: "80px" }}
            />

            <Button
              variant="outline-secondary"
              onClick={() => setQuantity((prevQuantity) => prevQuantity + 1)}
            >
              <FaPlus />
            </Button>
          </div>
        </Form.Group>

        <Button variant="success" onClick={handleAddToCart} className="w-100 btn btn-warning px-4 py-2">
          <FaShoppingCart className="me-2" /> Add to Cart
        </Button>

        {error && <Alert variant="danger" className="mt-3 text-center">{error}</Alert>}
        {success && <Alert variant="success" className="mt-3 text-center">Item added to cart successfully!</Alert>}
      </BootstrapCard.Body>
    </BootstrapCard>
  );
}