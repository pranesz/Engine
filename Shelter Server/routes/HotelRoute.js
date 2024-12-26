const express = require('express');
const router = express.Router();
const multer = require('multer');
const { postHotel, getHotels, getHotelById, updateHotel, deleteHotel, getUserHotelData } = require('../Controller/HotelController');

const authMiddleware = require('../middleware/authmiddleware');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); 
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // Max file size 10MB
    fileFilter: (req, file, cb) => {
        // Only accept image files
        if (!file.mimetype.startsWith('image/')) {
            return cb(new Error('Only image files are allowed.'));
        }
        cb(null, true);
    }
});

// Route to get all hotels
router.get('/hotels', getHotels);

// Route to get a single hotel by ID
router.get('/hotels/:id',authMiddleware, getHotelById);

// Route to post a new hotel
router.post('/hotels', upload.array('photos', 15), postHotel); // `authMiddleware` ensures the user is authenticated

// Route to update a hotel by ID
router.put('/hotels/:id', authMiddleware, updateHotel);

// Route to delete a hotel by ID
router.delete('/hotels/:id', authMiddleware, deleteHotel);

// Route to get all hotels for a specific user
router.get('/GetUserHotel', authMiddleware, getUserHotelData); // Fetch hotels based on the logged-in user

module.exports = router;