const SandPost = require("../models/Sand");
const mongoose = require('mongoose');

exports.createSandPost = async (req, res) => {
  try {
    const { 
      userId, 
      name, 
      email, 
      phoneNumber, 
      state = '',  
      district = '', 
      city = '', 
      sandType, 
      quantity, 
      price, 
      description 
    } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid userId format' });
    }

    const convertedUserId = new mongoose.Types.ObjectId(userId);
    const priceValue = Number(price);
    if (isNaN(priceValue)) {
      return res.status(400).json({ message: 'Invalid price or quantity' });
    }

    const images = req.files ? req.files.map((file) => file.path) : [];
    if (images.length === 0) {
      return res.status(400).json({ message: 'No images uploaded' });
    }
    const sandPost = new SandPost({
      userId: convertedUserId,
      name,
      email,
      phoneNumber,
      state,
      district,
      city,
      sandType,
      quantity,
      price: priceValue,
      description,
      images,
    });

    const savedPost = await sandPost.save();

    res.status(201).json(savedPost);

  } catch (error) {
    console.error("Error creating sand post:", error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

exports.getAllSand = async (req, res) => {
  try {
    const sand = await SandPost.find();
    res.status(200).json(sand);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching catering posts', error });
  }
};

exports.getUserSandData = async (req, res) => {

  try {
    const userId = req.userId

    const sand = await SandPost.find({ userId: userId });


    res.status(200).json(sand);
  } catch (error) {
    res.status(500).json({ message: "Error fetching houses data" });
  }
};


exports.getSandById = async (req, res) => {
  try {
    const sand = await SandPost.findById(req.params.id);
    if (!sand) {
      return res.status(404).json({ message: 'Sand post not found' });
    }
    res.json(sand);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateSand = async (req, res) => {
  const { id } = req.params;
  try {
    const updated = await SandPost.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ message: "Sand service not found" });
    }
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteSand = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await SandPost.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Sand service not found" });
    }
    res.status(200).json({ message: "Sand service deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
