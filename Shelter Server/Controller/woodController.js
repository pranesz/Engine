const Wood = require('../models/Wood');
const mongoose = require('mongoose');

exports.createWood = async (req, res) => {
    console.log(req.body);
    try {
        const { 
            userId, 
            name, 
            email, 
            phoneNumber, 
            state = '',  
            district = '', 
            city = '', 
            wood, 
            thickness, 
            quantityType, 
            quantity, 
            price, 
            description 
        } = req.body;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid userId format' });
        }
        const convertedUserId = new mongoose.Types.ObjectId(userId);
        const quantityValue = parseInt(quantity.replace(/\D/g, ''), 10);
        const priceValue = Number(price);

        if (isNaN(priceValue) || isNaN(quantityValue)) {
            return res.status(400).json({ message: 'Invalid price or quantity' });
        }
        const images = req.files ? req.files.map((file) => file.path) : [];

        if (images.length === 0) {
            return res.status(400).json({ message: 'No images uploaded' });
        }
        const woodPost = new Wood({
            userId: convertedUserId,
            name,
            email,
            phoneNumber,
            state,
            district,
            city,
            wood,
            thickness,
            quantityType,
            quantity: quantityValue,  
            price: priceValue,  
            description,
            images,
        });
        const savedPost = await woodPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        console.error("Error creating wood post:", error);
        res.status(500).json({ message: 'Error creating wood post', error: error.message });
    }
};


exports.getAllWood = async (req, res) => {
    try {
        const wood = await Wood.find();
        res.status(200).json(wood);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching catering posts', error });
    }
};

exports.getUserWoodData = async (req, res) => {
    try {
        const userId = req.userId
        const wood = await Wood.find({ userId: userId });
        res.status(200).json(wood);
    } catch (error) {
        res.status(500).json({ message: "Error fetching houses data" });
    }
};


exports.getWoodById = async (req, res) => {
    try {
        const wood = await Wood.findById(req.params.id);
        if (!wood) {
            return res.status(404).json({ message: 'Wood post not found' });
        }
        res.json(wood);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// update Itme
exports.updateWood = async (req, res) => {
    const { id } = req.params;
    try {
        const updated = await Wood.findByIdAndUpdate(id, req.body, { new: true });
        if (!updated) {
            return res.status(404).json({ message: "Wood service not found" });
        }
        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete  Item
exports.deleteWood = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Wood.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ message: "Wood service not found" });
        }
        res.status(200).json({ message: "Wood service deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
