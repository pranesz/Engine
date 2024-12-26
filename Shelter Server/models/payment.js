const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  plan: { type: String, required: true },
  amount: { type: Number, required: true },
  payment_id: { type: String, required: true },
  order_id: { type: String, required: true },
  payment_time: { type: Date, required: true },
  expiry_time: {type:Date,require:true},
  user_name: { type: String, required: true },
  user_email: { type: String, required: true },
  user_contact: { type: String, required: true },
  invoice_id:{type:String,require:true},
  status: { type: String, default: 'Pending' },
});
const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
