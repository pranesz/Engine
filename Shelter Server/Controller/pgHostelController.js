const PgHostel = require('../models/PgHostel');
const path = require('path')


exports.createPgHostel = async (req, res) => {
    try {
        const {
            userId, type, furnishing, food, acRoom, maintenance, totalFloors, carParking, pgHostelName, description, price, location,
            stateName, districtName, cityName, name, phoneNumber, purpose
        } = req.body;

        const photos = req.files ? req.files.map(file => file.path) : [];

        const newPG = new PgHostel({
            userId, type, furnishing, food, acRoom, maintenance, totalFloors, carParking, pgHostelName, description, price, location,
            stateName, districtName, cityName, name, phoneNumber, photos, purpose
        });

        await newPG.save();

        res.status(201).json({ message: 'House posted successfully!', pghostel: newPG });
    } catch (error) {
        console.error('Error creating ad:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};


exports.getPg = async (req, res) => {
    try {
        const Pgs = await PgHostel.find().sort({ createdAt: -1 }); // Fetch all ads, sorted by newest first
        res.status(200).json(Pgs);
    } catch (error) {
        console.error('Error fetching ads:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};


// Fetch all House data for a specific user
exports.getUserPgData = async (req, res) => {
    // console.log("getuserdata");

    try {
        // Fetch houses based on the extracted userId
        const userId = req.userId

        const Pgs = await PgHostel.find({ userId: userId });
        //   console.log(houses);

        res.status(200).json(Pgs);
    } catch (error) {
        res.status(500).json({ message: "Error fetching houses data" });
    }
};


exports.getPgHostelById = async (req, res) => {
    try {
        const { id } = req.params;
        const pgHostel = await PgHostel.findById(id);
        if (!pgHostel) {
            return res.status(404).json({ message: 'PG Hostel not found' });
        }
        res.status(200).json(pgHostel);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching PG Hostel', error });
    }
};



// update Itme
exports.updatePgHostel = async (req, res) => {
    const { id } = req.params;
    try {
        const updated = await PgHostel.findByIdAndUpdate(id, req.body, { new: true });
        if (!updated) {
            return res.status(404).json({ message: "PGHostel service not found" });
        }
        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete  Item
exports.deletePgHostel = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await PgHostel.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ message: "PGHostel service not found" });
        }
        res.status(200).json({ message: "PGHostel service deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

