const Cart = require('../models/cartSchema');
const FoodItem = require('../models/foodItem');
const User = require('../models/User');

exports.addToCart = async (req, res) => {
  try {
    const { foodItemId, quantity, options, img } = req.body;
    const user = req.user._id;

    const foodItem = await FoodItem.findById(foodItemId);
    if (!foodItem) return res.status(404).json({ message: 'Food item not found' });

    let cart = await Cart.findOne({ user });
    if (!cart) {
      cart = new Cart({ user, items: [], totalPrice: 0 });
    }

    const existingItemIndex = cart.items.findIndex(item => item.foodItem.toString() === foodItemId.toString());
    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += quantity;
      cart.items[existingItemIndex].options = options;
    } else {
      cart.items.push({ foodItem: foodItemId, quantity, options, img });
    }

    await cart.save();

    res.status(200).json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getCart = async (req, res) => {
  try {
    const user = req.user._id;
    const cart = await Cart.findOne({ user }).populate('items.foodItem');
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    res.status(200).json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateCart = async (req, res) => {
  try {
    const { cartItemId } = req.params;
    const { quantity, options, img } = req.body;
    const cart = await Cart.findOne({ 'items._id': cartItemId });

    if (!cart) return res.status(404).json({ message: 'Cart item not found' });

    const item = cart.items.id(cartItemId);
    item.quantity = quantity;
    item.options = options;
    item.img = img;

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
exports.removeFromCart = async (req, res) => {
    try {
      const { cartItemId } = req.params;
  
      const cart = await Cart.findOne({ 'items._id': cartItemId });
  
      if (!cart) return res.status(404).json({ message: 'Cart item not found' });
  
      const itemToRemove = cart.items.find(item => item._id.toString() === cartItemId);
  
      const itemTotalPrice = itemToRemove.quantity * itemToRemove.options.reduce((sum, option) => sum + option.price, 0);
  
      cart.totalPrice -= itemTotalPrice;
  
      cart.items = cart.items.filter(item => item._id.toString() !== cartItemId);
  
      await cart.save();
  
      res.status(200).json(cart);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  };
    

exports.clearCart = async (req, res) => {
  try {
    const user = req.user._id;
    const cart = await Cart.findOneAndUpdate(
      { user },
      { $set: { items: [], totalPrice: 0 } },
      { new: true }
    );
    res.status(200).json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
