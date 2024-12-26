const mongoose = require("mongoose");

const sandSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    state: { type: String, required: true },     
    district: { type: String, required: true },  
    city: { type: String, required: true },       
    sandType: { type: String, required: true },
    quantity: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, default: "sand" }, 
    images: [{ type: String, required: true }],
    description: { type: String, required: true },
});

const SandPost = mongoose.model("Sand", sandSchema);

module.exports = SandPost;
