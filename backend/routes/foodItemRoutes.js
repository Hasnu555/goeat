const express = require('express');
const router = express.Router();
const { getFoodItemsController, getAllFoodItemsController } = require('../controllers/foodItemController');

router.get('/food-items/:category', getFoodItemsController);
router.get('/food-items', getAllFoodItemsController);


module.exports = router;
