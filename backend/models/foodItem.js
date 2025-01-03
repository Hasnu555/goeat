const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  name: { type: String, required: true }, 
  price: { type: Number, required: true }, 
});

const foodItemSchema = new mongoose.Schema({
  CategoryName: { type: String, required: true }, 
  name: { type: String, required: true }, 
  img: { type: String, required: true }, 
  options: [optionSchema],  
  description: { type: String, required: true }, 
});

const FoodItem = mongoose.model('FoodData', foodItemSchema, 'foodData');

module.exports = FoodItem;
