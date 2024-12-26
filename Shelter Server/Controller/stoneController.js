const Stone = require('../models/Stone');
const mongoose = require('mongoose');

exports.createStone = async (req, res) => {
    // console.log(req.body);  
    try {
        const { 
            userId, 
            name, 
            email, 
            phoneNumber, 
            state = '',  
            district = '', 
            city = '', 
            stoneCategory, 
            stoneType, 
            quantity, 
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
            return res.status(400).json({ message: 'Invalid price or quantity' });
        }
        const images = req.files ? req.files.map((file) => file.path) : [];
        if (images.length === 0) {
            return res.status(400).json({ message: 'No images uploaded' });
        }
        const stonePost = new Stone({
            userId: convertedUserId,
            name,
            email,
            phoneNumber,
            state,
            district,
            city,
            stoneCategory,
            stoneType,
            quantity,   
            price: priceValue,
            description,
            images,
        });
        const savedPost = await stonePost.save();
        res.status(201).json(savedPost);

    } catch (error) {
        console.error("Error creating stone post:", error); 
        res.status(500).json({ message: 'Error creating stone post', error: error.message });
    }
};


exports.getAllStone = async (req, res) => {
  try {
    const stone = await Stone.find();
    res.status(200).json(stone);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching catering posts', error });
  }
};


exports.getUserStoneData = async (req, res) => {
  try {
    const userId = req.userId

    const stone = await Stone.find({ userId: userId });
    res.status(200).json(stone);
  } catch (error) {
    res.status(500).json({ message: "Error fetching houses data" });
  }
};


exports.getStoneById = async (req, res) => {
  try {
    const stone = await Stone.findById(req.params.id);
    if (!stone) {
      return res.status(404).json({ message: 'Stone post not found' });
    }
    res.status(200).json(stone);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// update Itme
exports.updateStone = async (req, res) => {
  const { id } = req.params;
  try {
    const updated = await Stone.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ message: "Stone service not found" });
    }
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete  Item
exports.deleteStone = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Stone.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Stone service not found" });
    }
    res.status(200).json({ message: "Stone service deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
