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

  const addFoodItem = async ({ CategoryName, name, img, options, description }) => {
    try {
      const foodItem = new FoodItem({
        CategoryName,
        name,
        img,
        options,
        description
      });
  
      await foodItem.save();
      return foodItem;
    } catch (error) {
      throw new Error('Failed to add food item');
    }
  };
  

module.exports = { getFoodItemsByCategory, getAllFoodItems, addFoodItem };
