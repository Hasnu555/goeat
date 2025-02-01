import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchFoodItems,
  fetchFoodCategories,
  setSelectedCategory,
  clearSelectedCategory,
} from "../redux/slices/menuSlices";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import Card from "../component/Card";
import Carousal from "../component/Carousal";
import BackgroundImage from "../image/background.png";

export default function Home() {
  const dispatch = useDispatch();
  const { foodItems, foodCategories, selectedCategory, loading, error } =
    useSelector((state) => state.menu);

  useEffect(() => {
    dispatch(fetchFoodItems());
    dispatch(fetchFoodCategories());
  }, [dispatch]);

  const handleCategoryClick = (categoryName) => {
    dispatch(setSelectedCategory(categoryName));
  };

  const handleViewAll = () => {
    dispatch(clearSelectedCategory());
  };

  const filteredFoodItems = selectedCategory
    ? foodItems.filter((item) => item.CategoryName === selectedCategory)
    : foodItems;

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  if (error) return <p className="text-danger text-center mt-4">Error: {error}</p>;

  return (
    <div className="d-flex flex-column min-vh-100">
      <main className="flex-grow-1">
        <Navbar />
        <Carousal />

        {/* Categories Section */}
        <div className="container my-5">
          <h2 className="text-center mb-4 fw-bold">Explore by Categories</h2>
          <div className="row justify-content-center">
            {foodCategories.map((category, index) => (
              <div className="col-md-3 text-center mb-3" key={index}>
                <div className="card border-0 shadow-sm hover-effect" onClick={() => handleCategoryClick(category.CategoryName)}>

                  <img
                    src={category.img}
                    alt={category.CategoryName}
                    className="card-img-top rounded"
                    style={{ height: "150px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title fw-bold">{category.CategoryName}</h5>
                  </div>
                </div>
              </div>
            ))}
            <div className="text-center mt-3">
            <button className="btn btn-warning px-4 py-2" onClick={handleViewAll}>
              View All
            </button>
            </div>
          </div>
        </div>

        {/* Food Items Section */}
        <div className="container my-5">
          <h2 className="text-center mb-4 fw-bold">Our Menu</h2>
          {filteredFoodItems.length > 0 ? (
            <div className="row justify-content-center">
              {filteredFoodItems.map((foodItem) => (
                <div className="col-md-4 mb-4" key={foodItem._id}>
                  <Card foodItems={foodItem} />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted">No food items available.</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
