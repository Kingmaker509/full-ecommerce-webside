const express = require("express");
const {
    processPayment,
    sendStripeApiKey,
} = require("../controllers/paymentController");
const router = express.Router();
const { isAuthenticatedUser } = require("../middleware/auth");

router.route("/payment/process").post(isAuthenticatedUser, processPayment);

router.route("/stripeapikey").get(isAuthenticatedUser, sendStripeApiKey);

module.exports = router;






// const express = require('express');
// const router = express.Router();
// const paytmController = require('../controllers/paymentController');

// router.post('/initiateTransaction', paytmController.initiateTransaction);

// module.exports = router;

