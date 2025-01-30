require("dotenv").config(); // Load environment variables
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const createPaymentIntent = async (amount, currency = "usd") => {
    try {
        if (!process.env.STRIPE_SECRET_KEY) {
            throw new Error("STRIPE_SECRET_KEY is missing in environment variables.");
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, // Convert amount to cents
            currency,
            automatic_payment_methods: { enabled: true },
        });
        return { clientSecret: paymentIntent.client_secret };
    } catch (error) {
        throw new Error(error.message);
        
    }
};

module.exports = { createPaymentIntent };
