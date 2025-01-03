const FoodCategory = require('../models/foodCategory');  
const getAllFoodCategories = async () => {
  try {
    const categories = await FoodCategory.find();
    return categories;
  } catch (error) {
    throw new Error('Failed to retrieve food categories');
  }
};

module.exports = { getAllFoodCategories };
