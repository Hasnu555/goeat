const mongoose = require('mongoose');
const FoodItem = require('./foodItem');

const cartItemSchema = new mongoose.Schema({
  foodItem: { type: mongoose.Schema.Types.ObjectId, ref: 'FoodData', required: true },  
  quantity: { type: Number, required: true, min: 1 },  
  options: [{ name: String, price: Number }],
  img : { type: String, required: true },  
});

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  
  items: [cartItemSchema], 
  totalPrice: { type: Number, default: 0 },  
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

cartSchema.pre('save', function(next) {
    let totalPrice = 0;
    
    this.items.forEach(item => {
      if (item.foodItem) {
        const foodItemPrice = item.foodItem.price || 0;
        const optionsPrice = item.options.reduce((sum, option) => sum + (option.price || 0), 0);
        totalPrice += (foodItemPrice + optionsPrice) * item.quantity;
      }
    });

    this.totalPrice = totalPrice;
    next();
  });  
  
module.exports = mongoose.model('Cart', cartSchema);
