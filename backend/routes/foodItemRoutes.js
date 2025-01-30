const express = require('express');
const router = express.Router();
const { getFoodItemsController, getAllFoodItemsController, addFoodItemController } = require('../controllers/foodItemController');
const { protect, authorizeAdmin } = require('../middleware/authMiddleware');

router.get('/food-items/:category', getFoodItemsController);
router.get('/food-items', getAllFoodItemsController);
router.post('/food-items', protect, authorizeAdmin, addFoodItemController);

module.exports = router;
