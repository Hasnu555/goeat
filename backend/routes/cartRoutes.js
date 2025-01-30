const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, cartController.addToCart);

router.get('/', protect, cartController.getCart);

router.put('/:cartItemId', protect, cartController.updateCart);

router.delete('/:cartItemId', protect, cartController.removeFromCart);

router.delete('/', protect, cartController.clearCart);

module.exports = router;

