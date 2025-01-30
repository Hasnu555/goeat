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
import BackgroundImage from "../image/background.png"

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="d-flex flex-column min-vh-100">
      <main className="flex-grow-1">
      <Navbar />
      <Carousal />

      {/* Categories Section */}
      <div className="container my-5">
        <h2 className="text-center mb-4">Explore by Categories</h2>
        <div className="row" >
          {foodCategories.map((category, index) => (
            <div className="col-md-3 text-center" key={index} style={{marginBottom: '1%' }}>
              <div
                className="card border-0 shadow-sm"
                onClick={() => handleCategoryClick(category.CategoryName)}
              >
                <img
                  src={category.img}
                  alt={category.CategoryName}
                  className="card-img-top"
                  style={{
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title">{category.CategoryName}</h5>
                </div>
              </div>
            </div>
          ))}
          <div className="text-center mb-4" style={{ marginTop: "2%" }}>
          <button className="btn btn-secondary" onClick={handleViewAll}>
            View All
          </button>
        </div>
        </div>
      </div>

      {/* Food Items Section */}
      <div className="container my-5">
        <h2 className="text-center mb-4">Our Menu</h2>
        {filteredFoodItems.length > 0 ? (
          <div className="row">
            {filteredFoodItems.map((foodItem) => (
              <div className="col-md-4 mb-4" key={foodItem._id}>
                <Card foodItems={foodItem} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center">No food items available.</p>
        )}
      </div>
      </main>
      <Footer />
    </div>
  );
}
