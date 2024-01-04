const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.processPayment = catchAsyncErrors(async (req, res, next) => {
    const myPayment = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "inr",
        metadata: {
            company: "Ecommerce",
        },
    });

    res
        .status(200)
        .json({ success: true, client_secret: myPayment.client_secret });
});

exports.sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
    res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});





// const https = require('https');
// const PaytmChecksum = require('paytmchecksum'); // Assuming this utility is in the same directory

// exports.initiateTransaction = async (req, res) => {
//     try {
//         const paytmParams = {
//             // Build your paytmParams body here...
//         };

//         // Generate Checksum
//         const checksum = await PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), "YOUR_MERCHANT_KEY");

//         paytmParams.head = {
//             "signature": checksum
//         };

//         const post_data = JSON.stringify(paytmParams);

//         const options = {
//             hostname: 'securegw-stage.paytm.in', // Replace with appropriate URL
//             port: 443,
//             path: '/theia/api/v1/initiateTransaction', // Replace with the endpoint
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Content-Length': post_data.length
//             }
//         };

//         let response = "";
//         const post_req = https.request(options, (post_res) => {
//             post_res.on('data', (chunk) => {
//                 response += chunk;
//             });

//             post_res.on('end', () => {
//                 console.log('Response: ', response);
//                 res.status(200).json({ response }); // Send the response back to the client
//             });
//         });

//         post_req.write(post_data);
//         post_req.end();
//     } catch (error) {
//         console.error('Error initiating transaction:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };
