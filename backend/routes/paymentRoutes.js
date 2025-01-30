const express = require("express");
const { processPayment } = require("../controllers/paymentController");

const router = express.Router();

router.post("/create-payment-intent", processPayment);

module.exports = router;
