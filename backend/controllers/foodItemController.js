const { getFoodItemsByCategory, getAllFoodItems } = require('../services/foodItemService');

const getFoodItemsController = async (req, res) => {
  const { category } = req.params;  
  try {
    const foodItems = await getFoodItemsByCategory(category);
    res.status(200).json({ success: true, data: foodItems });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


const getAllFoodItemsController = async (req, res) => {
    try {
      const foodItems = await getAllFoodItems();
      res.status(200).json({ success: true, data: foodItems });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

module.exports = { getFoodItemsController, getAllFoodItemsController };
