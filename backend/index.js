const express = require("express");
const http = require("http");
const mongoDB = require("./db");
const cors = require("cors");
const socket = require("./socket"); // Import socket module
const foodItemRoutes = require("./routes/foodItemRoutes");
const foodCategories = require("./routes/foodCategoryRoutes");
const cartRoutes = require("./routes/cartRoutes");
const userRoutes = require("./routes/userRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const orderRoutes = require("./routes/orderRoutes");
require("dotenv").config();

const app = express();
const server = http.createServer(app); 
const io = socket.init(server); 

// Middleware
app.use(cors({ 
  origin: ["http://localhost:3000", "http://127.0.0.1:3000"], 
  methods: ["GET", "POST", "PUT", "DELETE"], 
  credentials: true 
}));
app.use(express.json());

// Attach io to req so it can be used in controllers
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Logging middleware
app.use((req, res, next) => {
  console.log(`🛑 ${req.method} request to ${req.url}`);
  next();
});

// Routes
app.use("/user", userRoutes);
app.use("/api", foodItemRoutes);
app.use("/food-categories", foodCategories);
app.use("/cart", cartRoutes);
app.use("/payment", paymentRoutes);
app.use("/order", orderRoutes);

// Handle invalid routes
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

mongoDB();

// Start the Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// Graceful Shutdown
process.on("SIGINT", async () => {
  console.log("🛑 Server shutting down...");
  await mongoDB.disconnect();
  process.exit(0);
});
