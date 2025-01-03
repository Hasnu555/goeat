const { getAllFoodCategories } = require('../services/foodCategoryService');

const getAllFoodCategoriesController = async (req, res) => {
  try {
    const categories = await getAllFoodCategories();
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getAllFoodCategoriesController };