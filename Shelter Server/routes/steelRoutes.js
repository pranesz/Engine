const express = require('express');
const multer = require('multer');
const { createSteel, getAllSteel, getUserSteelData, getSteelById, deleteSteel, updateSteel } = require('../Controller/steelController');
const authMiddleware = require('../middleware/authmiddleware');
const router = express.Router();

// Multer config for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// POST route for submitting steel post
router.post('/steel', upload.array('images', 5), createSteel);
router.get('/steel', getAllSteel);
router.get('/steel/:id', getSteelById);
router.get('/GetUserSteel', authMiddleware, getUserSteelData);
router.put('/steel/:id', updateSteel);
router.delete('/steel/:id', deleteSteel);
module.exports = router;
