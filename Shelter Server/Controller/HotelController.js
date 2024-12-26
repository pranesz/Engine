const Hotel = require("../models/Hotels");
const path = require('path');

// Post a new hotel
exports.postHotel = async (req, res) => {
  try {
    const { userId, hotelName, roomType, amenities, foodOption, pricePerNight, totalRooms, availableRooms, description, stateName, districtName, cityName, location, contactName, contactNumber } = req.body;

    const photos = req.files ? req.files.map(file => file.path) : []; // Save photo paths from the request

    const hotel = new Hotel({
      userId,
      hotelName,
      roomType,
      amenities,
      foodOption,
      pricePerNight,
      totalRooms,
      availableRooms,
      description,
      stateName,
      districtName,
      cityName,
      location,
      contactName,
      contactNumber,
      photos,
      category: "hotel",
    });

    await hotel.save();
    res.status(201).json({ message: "Hotel posted successfully", hotel });
  } catch (error) {
    console.error("Error posting hotel:", error);
    res.status(500).json({ message: "Failed to post hotel", error: error.message });
  }
};

// Get all hotels
exports.getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (error) {
    console.error("Error fetching hotels:", error);
    res.status(500).json({ message: "Failed to fetch hotels", error: error.message });
  }
};

// Get a single hotel by ID
exports.getHotelById = async (req, res) => {
  try {
    const { id } = req.params;
    const hotel = await Hotel.findById(id);
    if (!hotel) return res.status(404).json({ message: "Hotel not found" });

    res.status(200).json(hotel);
  } catch (error) {
    console.error("Error fetching hotel:", error);
    res.status(500).json({ message: "Failed to fetch hotel", error: error.message });
  }
};

// Update a hotel
exports.updateHotel = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      hotelName,
      roomType,
      amenities,
      foodOption,
      pricePerNight,
      totalRooms,
      availableRooms,
      description,
      state,
      district,
      city,
      location,
      contactName,
      contactNumber,
    } = req.body;

    const photoUrls = req.files ? req.files.map(file => file.path) : undefined;

    const updatedData = {
      hotelName,
      roomType,
      amenities,
      foodOption,
      pricePerNight,
      totalRooms,
      availableRooms,
      description,
      state,
      district,
      city,
      location,
      contactName,
      contactNumber,
    };

    if (photoUrls) {
      updatedData.photos = photoUrls;
    }

    const hotel = await Hotel.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!hotel) return res.status(404).json({ message: "Hotel not found" });

    res.status(200).json({ message: "Hotel updated successfully", hotel });
  } catch (error) {
    console.error("Error updating hotel:", error);
    res.status(500).json({ message: "Failed to update hotel", error: error.message });
  }
};

// Delete a hotel
exports.deleteHotel = async (req, res) => {
  try {
    const { id } = req.params;

    const hotel = await Hotel.findByIdAndDelete(id);

    if (!hotel) return res.status(404).json({ message: "Hotel not found" });

    res.status(200).json({ message: "Hotel deleted successfully" });
  } catch (error) {
    console.error("Error deleting hotel:", error);
    res.status(500).json({ message: "Failed to delete hotel", error: error.message });
  }
};

exports.getUserHotelData = async (req, res) => {
  try {
    const userId = req.userId;
    const hotels = await Hotel.find({ userId});
    res.status(200).json(hotels);
      // Your logic to fetch user hotels here...
  } catch (error) {
      console.error("Error fetching user hotels:", error);
      res.status(500).json({ message: "Failed to fetch user hotels", error: error.message });
  }
};

