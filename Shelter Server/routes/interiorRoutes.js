const express = require('express');
const multer = require('multer');
const { createInterior, getAllInterior, getUserInteriorData, getInteriorById, updateInterior, deleteInterior } = require('../Controller/interiorController');
const authMiddleware = require('../middleware/authmiddleware');

const router = express.Router();

// Multer config for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// POST route for submitting an interior post
router.post('/interior', upload.array('images', 5), createInterior);
router.get('/interior', getAllInterior);
router.get('/interior/:id', getInteriorById);
router.get('/GetUserInterior', authMiddleware, getUserInteriorData);
router.put('/interior/:id', updateInterior);
router.delete('/interior/:id', deleteInterior);
module.exports = router;
