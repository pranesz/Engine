const express = require('express');
const multer = require('multer');
const { createStone, getAllStone, getUserStoneData, getStoneById, updateStone, deleteStone } = require('../Controller/stoneController');
const authMiddleware = require('../middleware/authmiddleware');

const router = express.Router();

// Multer config for handling image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Route to create a new stone post
router.post('/stone', upload.array('images', 5), createStone);
router.get('/stone', getAllStone);
router.get('/stone/:id', getStoneById);
router.get('/GetUserStone', authMiddleware, getUserStoneData);
router.put('/stone/:id', updateStone);
router.delete('/stone/:id', deleteStone);
module.exports = router;
