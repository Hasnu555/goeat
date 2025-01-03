const express = require("express");
const mongoDB = require("./db")
const cors = require("cors");
const foodItemRoutes = require('./routes/foodItemRoutes');
const foodCategories = require('./routes/foodCategoryRoutes');
const cartRoutes = require('./routes/cartRoutes');
const userRoutes = require('./routes/userRoutes');
const stripe = require('stripe')('your-secret-key');

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));

mongoDB();
const port = 5000;

app.use(express.json());
app.use("/user", userRoutes);
app.use("/api", foodItemRoutes);
app.use("/food-categories", foodCategories);
app.use("/cart", cartRoutes);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
