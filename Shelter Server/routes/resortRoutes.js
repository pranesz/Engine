const express = require('express');
const router = express.Router();
const {
    createResort,
    getResorts,
    getUserResortData,
    getResortById,
    updateResort,
    deleteResort
} = require('../Controller/resortController');  // Adjust path if needed
const multer = require('multer');
const authMiddleware = require('../middleware/authmiddleware'); // Ensure this path is correct

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');  // Ensure this folder exists in your project
    },
    filename: function (req, file, cb) {
        // Adding a timestamp to the filename to avoid collisions
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

// Routes for resort
router.post('/resorts', upload.array('photos', 15), createResort);  // Max 15 photos
router.get('/resorts', getResorts);
router.get('/GetUserResort', authMiddleware, getUserResortData);  // Fetch resorts for logged-in user
router.get('/resort/:id',  getResortById);
router.put('/resort/:id', authMiddleware, updateResort);
router.delete('/resort/:id', authMiddleware, deleteResort);

module.exports = router;
