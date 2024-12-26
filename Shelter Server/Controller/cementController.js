const CementPost = require("../models/Cements");
const mongoose = require("mongoose");

exports.createCementPost = async (req, res) => {
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
      cementType, 
      quantity, 
      price, 
      description 
    } = req.body;

    // Validate userId format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId format" });
    }
    const convertedUserId = new mongoose.Types.ObjectId(userId);

    // Convert price to number and check validity
    const priceValue = Number(price);
    if (isNaN(priceValue)) {
      return res.status(400).json({ message: "Invalid price value" });
    }

    // Validate if images are uploaded
    const images = req.files ? req.files.map((file) => file.path) : [];
    if (images.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    // Create a new cement post
    const cementPost = new CementPost({
      userId: convertedUserId,
      name,
      email,
      phoneNumber,
      state,
      district,
      city,
      brand,
      cementType,
      quantity,
      price: priceValue,
      description,
      images,
      category: "cement",
    });
    const savedPost = await cementPost.save();

    res.status(201).json(savedPost);

  } catch (error) {
    console.error("Error creating cement post:", error);
    res.status(500).json({ message: "Error creating cement post", error: error.message });
  }
};



// Get all Catering Posts
exports.getAllCement = async (req, res) => {
  try {
    const cements = await CementPost.find();
    res.status(200).json(cements);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching catering posts', error });
  }
};


exports.getUserCementData = async (req, res) => {
  // console.log("getuserdata");

  try {
    // Fetch cement based on the extracted userId
    const userId = req.userId

    const cement = await CementPost.find({ userId: userId });


    res.status(200).json(cement);
  } catch (error) {
    res.status(500).json({ message: "Error fetching houses data" });
  }
};

exports.getCementById = async (req, res) => {
  try {
    const cement = await CementPost.findById(req.params.id);
    if (!cement) {
      return res.status(404).json({ message: 'Cement not found' });
    }
    res.json(cement);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


exports.updateCement = async (req, res) => {
  const { id } = req.params;
  try {
    const updated = await CementPost.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ message: "Cement service not found" });
    }
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Cement Item
exports.deleteCement = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await CementPost.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Cement service not found" });
    }
    res.status(200).json({ message: "Cement service deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
