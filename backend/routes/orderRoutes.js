const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

if (!orderController.createOrder) {
  console.error("❌ orderController.createOrder is undefined");
}
if (!orderController.getUserOrders) {
  console.error("❌ orderController.getUserOrders is undefined");
}
if (!orderController.getAllOrders) {
  console.error("❌ orderController.getAllOrders is undefined");
}
if (!orderController.updateOrderStatus) {
  console.error("❌ orderController.updateOrderStatus is undefined");
}

// Ensure all controller functions exist
if (
  !orderController.createOrder ||
  !orderController.getUserOrders ||
  !orderController.getAllOrders ||
  !orderController.updateOrderStatus
) {
  throw new Error("❌ One or more orderController functions are missing.");
}

// Order Endpoints
router.post("/create-order", orderController.createOrder);
router.get("/user-orders/:userId", orderController.getUserOrders);
router.get("/all-orders", orderController.getAllOrders);
router.put("/update-status/:orderId", orderController.updateOrderStatus);
router.put("/assign-driver", orderController.assignDriver);
router.put("/update-driver-location/:orderId", orderController.updateDriverLocation);

module.exports = router;
