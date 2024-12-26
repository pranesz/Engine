const mongoose = require("mongoose");

const resortSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    resortName: {
        type: String,
        required: true,
    },
    amenities: {
        type: [String], // Array of amenities like pool, spa, etc.
    },
    roomType: {
        type: String,
        required: false,
    },
    pricePerNight: {
        type: Number,
        required: true,
    },
    totalRooms: {
        type: Number,
        required: true,
    },
    availableRooms: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: false,
    },
    contactName: {
        type: String,
        required: true,
    },
    contactNumber: {
        type: String,
        required: true,
    },
    stateName: {
        type: String,
    },
    districtName: {
        type: String,
    },
    cityName: {
        type: String,
    },
    photos: {
        type: [String], // Array to store paths of uploaded images
    },
    category: {
        type: String,
        default: "resort", // Default value as "resort"
    },
}, { timestamps: true });  // Add timestamps for createdAt and updatedAt

const Resort = mongoose.model("Resort", resortSchema);
module.exports = Resort;
