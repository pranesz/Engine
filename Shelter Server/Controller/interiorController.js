const Interior = require('../models/Interior');
const mongoose = require('mongoose');

exports.createInterior = async (req, res) => {
  try {
    const { 
      userId, 
      name, 
      email, 
      phoneNumber, 
      state = '',  
      district = '', 
      city = '', 
      type, 
      products, 
      price, 
      description 
    } = req.body;

    // Validate userId format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid userId format' });
    }
    const convertedUserId = new mongoose.Types.ObjectId(userId);

    // Ensure that price is a valid number
    const priceValue = Number(price);
    if (isNaN(priceValue)) {
      return res.status(400).json({ message: 'Invalid price' });
    }

    // Handle image upload
    const images = req.files ? req.files.map((file) => file.path) : [];
    if (images.length === 0) {
      return res.status(400).json({ message: 'No images uploaded' });
    }

    // Create the Interior post object
    const interiorPost = new Interior({
      userId: convertedUserId,
      name,
      email,
      phoneNumber,
      state,
      district,
      city,
      type,
      products,
      price: priceValue,
      description,
      images,
    });

    // Save the post to the database
    const savedPost = await interiorPost.save();

    // Return the saved post
    res.status(201).json(savedPost);

  } catch (error) {
    console.error("Error creating interior post:", error);
    res.status(500).json({ message: 'Error creating interior post', error: error.message });
  }
};


exports.getAllInterior = async (req, res) => {
  try {
    const interior = await Interior.find();
    res.status(200).json(interior);
  } catch (error) {
    console.error('Error fetching interior posts:', error);
    res.status(500).json({ message: 'Error fetching interior posts', error });
  }
};



exports.getUserInteriorData = async (req, res) => {
  // console.log("getuserdata");

  try {
    // Fetch Interior based on the extracted userId
    const userId = req.userId

    const interior = await Interior.find({ userId: userId });


    res.status(200).json(interior);
  } catch (error) {
    res.status(500).json({ message: "Error fetching houses data" });
  }
};

exports.getInteriorById = async (req, res) => {
  try {
    const { id } = req.params;
    const interior = await Interior.findById(id);
    if (!interior) {
      return res.status(404).json({ message: 'Interior post not found' });
    }
    res.status(200).json(interior);
  } catch (error) {
    console.error('Error fetching interior post by ID:', error);
    res.status(500).json({ message: 'Error fetching interior post by ID', error });
  }
};


// update Itme
exports.updateInterior = async (req, res) => {
  const { id } = req.params;
  try {
    const updated = await Interior.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ message: "Interior service not found" });
    }
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete  Item
exports.deleteInterior = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Interior.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Interior service not found" });
    }
    res.status(200).json({ message: "Interior service deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
