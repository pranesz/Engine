
const Contact = require('../models/Contacts');
const path = require('path')




exports. getLimitedContacts = async (req, res) => {
    try {
        const { userId } = req.body; // Assume userId is sent in the request body
        const now = new Date();
        const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
        const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0, 0);

        // Count user contact accesses within the day
        const contactCount = await Contact.countDocuments({
            userId,
            accessedAt: { $gte: startOfDay, $lte: endOfDay },
        });

        if (contactCount >= 2) {
            return res.status(403).json({ message: "Daily contact limit reached." });
        }

        const { landId } = req.body;
        const land = await Land.findById(landId);

        if (!land) {
            return res.status(404).json({ message: "Land not found." });
        }

        // Save contact access
        const newContact = new Contact({ userId, landId });
        await newContact.save();

        res.status(200).json({
            name: land.name,
            phoneNumber: land.phoneNumber,
        });
    } catch (error) {
        console.error("Error fetching contacts:", error);
        res.status(500).json({ message: "Failed to fetch contacts", error: error.message });
    }
};


