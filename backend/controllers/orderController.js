const orderService = require("../services/orderService");

const createOrder = async (req, res) => {
  try {
    const orderData = req.body;
    const result = await orderService.createOrder(orderData);

    req.io.emit("new-order", result.order);

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await orderService.getUserOrders(userId);
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const updatedOrder = await orderService.updateOrderStatus(orderId, status);

    req.io.to(orderId).emit("order-status-updated", { orderId, status });

    res.json({ success: true, message: "Order status updated", order: updatedOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const assignDriver = async (req, res) => {
  try {
    const { orderId, driverId } = req.body;
    const updatedOrder = await orderService.assignDriver(orderId, driverId);

    req.io.to(orderId).emit("driver-assigned", updatedOrder);

    res.json({ success: true, message: "Driver assigned successfully", order: updatedOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateDriverLocation = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { lat, lng } = req.body;
    const updatedOrder = await orderService.updateDriverLocation(orderId, lat, lng);

    req.io.to(orderId).emit("driver-location-updated", { lat, lng });

    res.json({ success: true, message: "Driver location updated", order: updatedOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createOrder,
  getUserOrders,
  updateOrderStatus,
  assignDriver,
  updateDriverLocation,
  getAllOrders
};
