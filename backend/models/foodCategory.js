const mongoose = require('mongoose');

const foodCategorySchema = new mongoose.Schema({
  CategoryName: { type: String, required: true },
  img: { type: String, required: false },  
});

const FoodCategory = mongoose.model('foodCategory', foodCategorySchema, 'foodCategory');

module.exports = FoodCategory;
