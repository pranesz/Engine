const mongoose = require("mongoose");


const ContactSchema = new mongoose.Schema({
    userId: { type: String, required: true }, // User accessing contacts
    landId: { type: mongoose.Schema.Types.ObjectId, ref: "Land", required: true }, // Land contacted
    accessedAt: { type: Date, default: Date.now }, // Access timestamp
});

const Contact = mongoose.model("Contact", ContactSchema);
module.exports = { Contact };







