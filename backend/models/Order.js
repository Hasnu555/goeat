const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      foodItem: { type: mongoose.Schema.Types.ObjectId, ref: "FoodData" },
      quantity: Number,
      options: [{ name: String, price: Number }],
    },
  ],
  totalPrice: { type: Number, required: true },
  deliveryOption: { type: String, enum: ["pickup", "delivery"], required: true },
  address: { type: String, required: function () { return this.deliveryOption === "delivery"; } },
  coordinates: { lat: Number, lng: Number }, 
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, 
  driverLocation: { lat: Number, lng: Number }, 
  status: { 
    type: String, 
    enum: ["Pending", "Preparing", "Out for Delivery", "Delivered"], 
    default: "Pending" 
  },
  estimatedTimeArrival: { type: String }, 
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", orderSchema);
