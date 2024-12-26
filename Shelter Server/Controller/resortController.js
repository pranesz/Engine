const Resort = require('../models/Resort');  // Adjust path if necessary

// Create Resort
exports.createResort = async (req, res) => {
    try {
        const {
            userId, resortName, amenities, roomType, pricePerNight, totalRooms, 
            availableRooms, description, location, contactName, contactNumber, stateName,
            districtName, cityName,
        } = req.body;

        // Handle photos if they are uploaded
        const photos = req.files ? req.files.map(file => file.path) : [];

        // Create a new resort entry
        const newResort = new Resort({
            userId, resortName, amenities, roomType, pricePerNight, totalRooms,
            availableRooms, description, location, contactName, contactNumber, stateName,
            districtName, cityName,
            photos, category: "resort" // Optional: if you're categorizing resorts
        });

        // Save resort to the database
        await newResort.save();

        res.status(201).json({ message: 'Resort posted successfully!', resort: newResort });
    } catch (error) {
        console.error('Error creating resort:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};

// Get All Resorts
exports.getResorts = async (req, res) => {
    try {
        console.log('Fetching resorts...');
        const resorts = await Resort.find().sort({ createdAt: -1 }); // Sort by creation date
        console.log('Fetched resorts:', resorts);
        res.status(200).json(resorts);
    } catch (error) {
        console.error('Error fetching resorts:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};

// Get Resorts by User
exports.getUserResortData = async (req, res) => {
    try {
        const userId = req.userId;  // Ensure the userId is being passed correctly
        const resorts = await Resort.find({ userId: userId });
        res.status(200).json(resorts);
    } catch (error) {
        console.error('Error fetching user resorts data:', error);
        res.status(500).json({ message: 'Error fetching resorts data' });
    }
};

// Get Resort by ID
exports.getResortById = async (req, res) => {
    const { id } = req.params;
    try {
        const resort = await Resort.findById(id);
        if (!resort) return res.status(404).json({ message: 'Resort not found' });
        res.status(200).json(resort);
    } catch (error) {
        console.error('Error fetching resort:', error);
        res.status(500).json({ message: 'Error fetching resort data' });
    }
};

// Update Resort
exports.updateResort = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedResort = await Resort.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedResort) {
            return res.status(404).json({ message: "Resort not found" });
        }
        res.status(200).json(updatedResort);
    } catch (error) {
        console.error('Error updating resort:', error);
        res.status(500).json({ message: 'Error updating resort' });
    }
};

// Delete Resort
exports.deleteResort = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedResort = await Resort.findByIdAndDelete(id);
        if (!deletedResort) {
            return res.status(404).json({ message: "Resort not found" });
        }
        res.status(200).json({ message: "Resort deleted" });
    } catch (error) {
        console.error('Error deleting resort:', error);
        res.status(500).json({ message: 'Error deleting resort' });
    }
};
