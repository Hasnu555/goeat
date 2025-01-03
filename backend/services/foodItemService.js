const FoodItem = require('../models/foodItem');

const getFoodItemsByCategory = async (category) => {
  try {
    const foodItems = await FoodItem.find({ CategoryName: category });
    return foodItems;
  } catch (error) {
    throw new Error('Failed to retrieve food items');
  }
};

const getAllFoodItems = async () => {
    try {
      const foodItems = await FoodItem.find();
      return foodItems;
    } catch (error) {
      throw new Error('Failed to retrieve food items');
    }
  };

module.exports = { getFoodItemsByCategory, getAllFoodItems };
