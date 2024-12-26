const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", // Reference to the User collection
    },
    hotelName: { type: String, required: true },
    roomType: { type: String, required: true },
    amenities: { type: [String], required: true },
    foodOption: { type: String, required: true },
    pricePerNight: { type: Number, required: true },
    totalRooms: { type: Number, required: true },
    availableRooms: { type: Number, required: true },
    description: { type: String, required: true },
    stateName: { type: String, required: true },
    districtName: { type: String, required: true },
    cityName:{ type: String, required: true },
    location: {type:String, required:true},
    contactName: { type: String, required: true },
    contactNumber: { type: String, required: true },
    photos: [{ type: String }],// Array of photo URLs
    category:{ type:String, default: "hotel"}
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

module.exports = mongoose.model("Hotel", hotelSchema);
