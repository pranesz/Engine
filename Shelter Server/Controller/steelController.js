const SteelPost = require('../models/Steel');
const mongoose = require('mongoose');

exports.createSteel = async (req, res) => {
  try {
    const { 
      userId, 
      name, 
      email, 
      phoneNumber, 
      state = '', 
      district = '', 
      city = '', 
      brand, 
      steelCategory, 
      steelType, 
      steelThickness, 
      meter, 
      price, 
      description 
    } = req.body;

    // Validate userId format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid userId format' });
    }

    const convertedUserId = new mongoose.Types.ObjectId(userId);
    const priceValue = Number(price);
    if (isNaN(priceValue)) {
      return res.status(400).json({ message: 'Invalid price format' });
    }

    // Handle image uploads
    const images = req.files ? req.files.map((file) => file.path) : [];
    if (images.length === 0) {
      return res.status(400).json({ message: 'No images uploaded' });
    }

    // Create the steel post object
    const steelPost = new SteelPost({
      userId: convertedUserId,
      name,
      email,
      phoneNumber,
      state,
      district,
      city,
      brand,
      steelCategory,
      steelType,
      steelThickness,
      meter,
      price: priceValue,
      description,
      images,
    });

    // Save the steel post
    const savedPost = await steelPost.save();
    res.status(201).json(savedPost);
  
  } catch (error) {
    console.error("Error creating steel post:", error);
    res.status(500).json({ message: 'Error creating steel post', error: error.message });
  }
};


exports.getAllSteel = async (req, res) => {
  try {
    const steel = await SteelPost.find();
    res.status(200).json(steel);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching catering posts', error });
  }
};


exports.getUserSteelData = async (req, res) => {
  // console.log("getuserdata");

  try {
    // Fetch houses based on the extracted userId
    const userId = req.userId

    const steel = await SteelPost.find({ userId: userId });
    //   console.log(houses);

    res.status(200).json(steel);
  } catch (error) {
    res.status(500).json({ message: "Error fetching houses data" });
  }
};

exports.getSteelById = async (req, res) => {
  try {
    const steel = await SteelPost.findById(req.params.id);
    if (!steel) {
      return res.status(404).json({ message: 'Steel post not found' });
    }
    res.json(steel);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// update Itme
exports.updateSteel = async (req, res) => {
  const { id } = req.params;
  try {
    const updated = await SteelPost.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ message: "Steel service not found" });
    }
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete  Item
exports.deleteSteel = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await SteelPost.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Steel service not found" });
    }
    res.status(200).json({ message: "Steel service deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
