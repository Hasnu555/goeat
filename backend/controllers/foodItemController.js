const {
  getFoodItemsByCategory,
  getAllFoodItems,
  addFoodItem
} = require("../services/foodItemService");

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

const addFoodItemController = async (req, res) => {
  const { CategoryName, name, img, options, description } = req.body;
  
  try {
    const foodItem = await addFoodItem({ CategoryName, name, img, options, description });

    res.status(201).json({ success: true, message: 'Food item added successfully', data: foodItem });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


module.exports = { getFoodItemsController, getAllFoodItemsController, addFoodItemController };
