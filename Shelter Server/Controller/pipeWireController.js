const PipeWire = require('../models/PipeWire');
const mongoose = require('mongoose');

exports.createPipeWirePost = async (req, res) => {
  try {
    const { 
      userId, 
      name, 
      email, 
      phoneNumber, 
      state = '',  
      district = '', 
      city = '', 
      Type, 
      pipeType, 
      pipeBrand, 
      pipeDiameter, 
      pipeLength, 
      wireBrand, 
      wireType, 
      wireDiameter, 
      wireLength, 
      quantity, 
      price, 
      description 
    } = req.body;

    // Validate userId format (ensure it's a valid ObjectId)
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid userId format' });
    }
    const convertedUserId = new mongoose.Types.ObjectId(userId);


    // Ensure that images are uploaded
    const images = req.files ? req.files.map((file) => file.path) : [];
    if (images.length === 0) {
      return res.status(400).json({ message: 'No images uploaded' });
    }

    // Create the PipeWire post object
    const pipeWirePost = new PipeWire({
      userId: convertedUserId,
      name,
      email,
      phoneNumber,
      state,
      district,
      city,
      Type,
      pipeType,
      pipeBrand,
      pipeDiameter,
      pipeLength,
      wireBrand,
      wireType,
      wireDiameter,
      wireLength,
      quantity,    
      price,
      description,
      images,
    });

    // Save the post in the database
    const savedPost = await pipeWirePost.save();

    // Return the saved post as a response
    res.status(201).json(savedPost);

  } catch (error) {
    console.error("Error creating pipe & wire post:", error);
    res.status(500).json({ message: 'Error creating pipe & wire post', error: error.message });
  }
};


exports.getAllPipeWire = async (req, res) => {
  try {
    const pipewires = await PipeWire.find();
    res.status(200).json(pipewires);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching catering posts', error });
  }
};

exports.getUserPipeWireData = async (req, res) => {
  // console.log("getuserdata");

  try {
    // Fetch pipewires based on the extracted userId
    const userId = req.userId

    const pipewires = await PipeWire.find({ userId: userId });


    res.status(200).json(pipewires);
  } catch (error) {
    res.status(500).json({ message: "Error fetching houses data" });
  }
};

exports.getPipeWireById = async (req, res) => {
  try {
    const pipeWire = await PipeWire.findById(req.params.id);
    if (!pipeWire) {
      return res.status(404).json({ message: 'Pipe/Wire product not found' });
    }
    res.status(200).json(pipeWire);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// update Itme
exports.updatePipeWires = async (req, res) => {
  const { id } = req.params;
  try {
    const updated = await PipeWire.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ message: "Pipe&Wires service not found" });
    }
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete  Item
exports.deletePipeWires = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await PipeWire.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Pipe&Wires service not found" });
    }
    res.status(200).json({ message: "Pipe&Wires service deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
