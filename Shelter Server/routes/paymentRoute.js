const express = require('express');
const router = express.Router();
const razorpayController = require('../Controller/paymentController');

router.post('/create-order', razorpayController.createOrder);
router.post('/verify-payment', razorpayController.verifyPayment);
router.get('/getpayments', razorpayController.getAllPayments);
router.get('/getpayment/:userId', razorpayController.getPaymentsByUserId);

module.exports = router;
