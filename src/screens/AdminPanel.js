import React, { useState } from "react";

const AdminPanel = () => {
  const [CategoryName, setCategoryName] = useState("");
  const [name, setName] = useState("");
  const [img, setImg] = useState(""); // This will store the Base64 string
  const [options, setOptions] = useState([{ name: "", price: "" }]);
  const [description, setDescription] = useState("");

  const handleOptionChange = (index, field, value) => {
    const updatedOptions = [...options];
    updatedOptions[index][field] = value;
    setOptions(updatedOptions);
  };

  const handleAddOption = () => {
    setOptions([...options, { name: "", price: "" }]);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setImg(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("authToken");
      const userRole = localStorage.getItem("userRole");
      if (userRole !== "admin") {
        alert("You must be logged in as admin to perform this action.");
        return;
      }

      const payload = { CategoryName, name, img, options, description };
      const response = await fetch("http://localhost:5000/api/food-items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Food item added successfully!");
        // Reset form after successful submission
        setCategoryName("");
        setName("");
        setImg("");
        setOptions([{ name: "", price: "" }]);
        setDescription("");
      } else {
        alert(data.message || "Failed to add food item.");
      }
    } catch (error) {
      alert("An error occurred while adding the food item.");
      console.error(error);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(https://images.unsplash.com/photo-1518685101044-3b5a4e7580a3?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        className="container my-5"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          borderRadius: "15px",
          padding: "30px",
          maxWidth: "600px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        <h2 className="text-center mb-4">Admin Panel</h2>

        {/* Add Food Item Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="CategoryName" className="form-label">
              Category Name
            </label>
            <input
              type="text"
              className="form-control"
              id="CategoryName"
              value={CategoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Food Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="img" className="form-label">
              Food Image
            </label>
            <input
              type="file"
              className="form-control"
              id="img"
              onChange={handleImageUpload}
              accept="image/*"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label className="form-label">Options</label>
            {options.map((option, index) => (
              <div className="d-flex mb-2" key={index}>
                <input
                  type="text"
                  className="form-control me-2"
                  placeholder="Option Name"
                  value={option.name}
                  onChange={(e) =>
                    handleOptionChange(index, "name", e.target.value)
                  }
                  required
                />
                <input
                  type="number"
                  className="form-control"
                  placeholder="Option Price"
                  value={option.price}
                  onChange={(e) =>
                    handleOptionChange(index, "price", e.target.value)
                  }
                  required
                />
              </div>
            ))}
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleAddOption}
            >
              Add Option
            </button>
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100"
            style={{ marginTop: "20px" }}
          >
            Add Food Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminPanel;
