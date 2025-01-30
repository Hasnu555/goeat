const { createPaymentIntent } = require("../services/stripeService");

const processPayment = async (req, res) => {
    try {
        const { amount } = req.body;

        if (!amount) {
            return res.status(400).json({ error: "Amount is required" });
        }

        const paymentIntent = await createPaymentIntent(amount);
        res.status(200).json(paymentIntent);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { processPayment };
