const Razorpay = require('razorpay');
require('dotenv').config();
const crypto = require('crypto');
const Payment = require('../models/payment'); 
const cron = require('node-cron');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID, 
  key_secret: process.env.RAZORPAY_KEY_SECRET 
});

const planData = {
  Prime: { price: 1500, duration: 30 },
  'Prime Plus': { price: 2500, duration: 60 },
  Elite: { price: 3500, duration: 90 }
};

const createOrder = (req, res) => {
  const { amount } = req.body;
  
  if (!amount || isNaN(amount)) {
    return res.status(400).json({
      error: 'Invalid amount provided'
    });
  }

  console.log('Creating order for amount:', amount);

  const options = {
    amount: amount * 100,
    currency: 'INR',
    receipt: `receipt_${Math.random().toString(36).substring(7)}`,
    notes: {
      key: 'value'
    }
  };

  razorpay.orders.create(options, (err, order) => {
    if (err) {
      console.error('Error in creating Razorpay order:', err);
      return res.status(500).json({
        error: 'Unable to create Razorpay order',
        details: err
      });
    }
    console.log('Razorpay order created:', order); 
    res.status(200).json({
      success: true,
      order
    });
  });
};


const verifyPayment = async (req, res) => {
  const {
    order_id,
    payment_id,
    signature,
    user_id,
    plan,
    amount,
    payment_time,
    user_name,
    user_email,
    user_contact,
    invoice_id
  } = req.body;

  try {
    const generated_signature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(order_id + '|' + payment_id)
      .digest('hex');

    if (generated_signature === signature) {
      const currentPlan = await Payment.findOne({ user_id }).sort({ payment_time: -1 });

      let expiryDuration = 0;
      let updatedAmount = amount;
      let isUpgrade = false;

      if (planData[plan]) {
        expiryDuration = planData[plan].duration;

        if (currentPlan) {
          const planAmount = currentPlan.amount;

          if (plan === 'Prime Plus' && currentPlan.plan === 'Prime') {
            updatedAmount = amount - planData['Prime'].price; 
            isUpgrade = true;
          } else if (plan === 'Elite' && currentPlan.plan === 'Prime') {
            updatedAmount = amount - planData['Prime'].price; 
            isUpgrade = true;
          } else if (plan === 'Elite' && currentPlan.plan === 'Prime Plus') {
            updatedAmount = amount - planData['Prime Plus'].price; 
            isUpgrade = true;
          }
        }
      }
      const expiry_time = new Date(payment_time);
      expiry_time.setDate(expiry_time.getDate() + expiryDuration);

      const currentDate = new Date();
      if (expiry_time <= currentDate) {
        await Payment.deleteMany({
          user_id: user_id,
          expiry_time: { $lte: currentDate }
        });
        console.log('Expired plan deleted immediately after payment verification');
      }

      const newPayment = new Payment({
        user_id,
        plan,
        amount: updatedAmount, 
        payment_id,
        order_id,
        payment_time,
        expiry_time,
        user_name,
        user_email,
        user_contact,
        invoice_id,
        status: 'Completed',
      });

      await newPayment.save();
      if (isUpgrade) {
        console.log(`User upgraded from ${currentPlan.plan} to ${plan}`);
      }

      return res.status(200).json({
        success: true,
        message: 'Payment successfully verified and plan saved!',
        payment_id,
        invoice_id,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'Payment verification failed',
      });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
};


const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    res.status(200).json({
      success: true,
      payments
    });
  } catch (error) {
    console.error('Error fetching payments:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

const getPaymentsByUserId = async (req, res) => {
  const { userId } = req.params;
  
  try {
    const payments = await Payment.find({ user_id: userId });
    
    if (!payments || payments.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No payments found for the provided user ID'
      });
    }
    
    res.status(200).json({
      success: true,
      payments
    });
  } catch (error) {
    console.error('Error fetching payments by user ID:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

cron.schedule('* * * * *', async () => {
  try {
    const currentDate = new Date(); 
    const expiredPayments = await Payment.find({
      expiry_time: { $lte: currentDate } 
    });

    if (expiredPayments.length > 0) {
      await Payment.deleteMany({
        expiry_time: { $lte: currentDate } 
      });

      console.log(`Deleted ${expiredPayments.length} expired plans at ${currentDate}`);
    } else {
      console.log('No expired plans to delete at this time.');
    }
  } catch (error) {
    console.error('Error cleaning expired plans:', error);
  }
});

module.exports = {
  createOrder,
  verifyPayment,
  getAllPayments,
  getPaymentsByUserId
};
