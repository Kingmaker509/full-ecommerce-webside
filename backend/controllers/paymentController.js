// const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// exports.processPayment = catchAsyncErrors(async (req, res, next) => {
//     const myPayment = await stripe.paymentIntents.create({
//         amount: req.body.amount,
//         currency: "inr",
//         metadata: {
//             company: "Ecommerce",
//         },
//     });

//     res
//         .status(200)
//         .json({ success: true, client_secret: myPayment.client_secret });
// });

// exports.sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
//     res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
// });

// const { instance } = require("../server.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const crypto = require("crypto");
const { Payment } = require("../models/paymentModel.js");
const Razorpay = require("razorpay");


exports.checkout = catchAsyncErrors(async (req, res) => {
    const instance = new Razorpay({
        key_id: process.env.RAZORPAY_API_KEY,
        key_secret: process.env.RAZORPAY_APT_SECRET,
    });
    const rawAmount = req.body.amount;

    const amountInPaise = Math.ceil(Number(rawAmount) * 100);
    const options = {
        amount: amountInPaise,
        currency: "INR",
    };

    const order = await instance.orders.create(options);

    res.status(200).json({
        success: true,
        order,
    });
});

exports.paymentVerification = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
        req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
        .update(body)
        .digest("hex");
    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
        // Database operations go here

        await Payment.create({
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
        });

        res.redirect(
            `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
        );
    } else {
        res.status(400).json({
            success: false,
        });
    }
};
