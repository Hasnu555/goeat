const Order = require("../models/Order");

const createOrder = async (orderData) => {
  try {
    const newOrder = new Order(orderData);
    await newOrder.save();
    return { success: true, message: "Order placed successfully", order: newOrder };
  } catch (error) {
    throw new Error("Failed to place order: " + error.message);
  }
};

const getUserOrders = async (userId) => {
  return await Order.find({ user: userId }).sort({ createdAt: -1 }).populate("items.foodItem");
};

const getAllOrders = async () => {
  return await Order.find().populate("user").sort({ createdAt: -1 });
};

const updateOrderStatus = async (orderId, status, io) => {
  const updatedOrder = await Order.findByIdAndUpdate(orderId, { status }, { new: true });

  io.to(orderId.toString()).emit("order-status-changed", status);

  return updatedOrder;
};

const assignDriver = async (orderId, driverId) => {
  const updatedOrder = await Order.findByIdAndUpdate(
    orderId,
    { driver: driverId, status: "Driver Assigned" },
    { new: true }
  );

  return updatedOrder;
};

const updateDriverLocation = async (orderId, lat, lng, io) => {
  const updatedOrder = await Order.findByIdAndUpdate(orderId, { driverLocation: { lat, lng } }, { new: true });

  io.to(orderId.toString()).emit("driver-location-updated", { lat, lng });

  return updatedOrder;
};

module.exports = {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
  assignDriver,
  updateDriverLocation,
  getAllOrders
};
