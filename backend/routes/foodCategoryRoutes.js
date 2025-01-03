const express = require('express');
const router = express.Router();
const { getAllFoodCategoriesController } = require('../controllers/foodCategoryController');

router.get('/', getAllFoodCategoriesController);

module.exports = router;