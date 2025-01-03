import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../redux/slices/cartSlice";
import { Card as BootstrapCard, Button, Form, Alert, Spinner } from "react-bootstrap";

export default function CardComponent({ foodItems }) {
  const dispatch = useDispatch();
  const { name, img, description, options } = foodItems;

  const [selectedOption, setSelectedOption] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(null); // For error messages
  const [success, setSuccess] = useState(false); // For success messages

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  const handleAddToCart = () => {
    // Validate selection
    if (!selectedOption) {
      setError("Please select an option.");
      return;
    }

    const option = options.find((opt) => opt.name === selectedOption);
    
    if (!option) {
      setError("Selected option is invalid.");
      return;
    }
    console.log(option);
    dispatch(
      addItemToCart({
        foodItemId: foodItems._id,
        quantity: quantity,
        options: {
          name: option.name,
          price: option.price,
        },
        img: img
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
    <BootstrapCard className="mt-3" style={{ width: "95%", maxHeight: "560px" }}>
      <BootstrapCard.Img
        variant="top"
        src={img}
        alt={name}
        style={{ height: "200px", objectFit: "cover" }}
      />
      <BootstrapCard.Body>
        <BootstrapCard.Title>{name}</BootstrapCard.Title>
        <BootstrapCard.Text>{description}</BootstrapCard.Text>

        <Form.Group controlId={`optionSelect-${foodItems._id}`} className="mb-3">
          <Form.Select value={selectedOption} onChange={handleOptionChange}>
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
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            min="1"
            value={quantity}
            onChange={handleQuantityChange}
            style={{ width: "100px" }}
          />
        </Form.Group>

        <Button variant="success" onClick={handleAddToCart} className="w-100">
          Add to Cart
        </Button>

        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
        {success && <Alert variant="success" className="mt-3">Item added to cart successfully!</Alert>}
      </BootstrapCard.Body>
    </BootstrapCard>
  );
}
