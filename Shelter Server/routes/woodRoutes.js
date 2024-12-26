const express = require('express');
const multer = require('multer');
const { createWood, getAllWood, getUserWoodData, getWoodById, updateWood, deleteWood } = require('../Controller/woodController');
const authMiddleware = require('../middleware/authmiddleware');

const router = express.Router();

// Multer config for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// POST route for submitting wood post
router.post('/wood', upload.array('images', 5), createWood);
router.get('/wood', getAllWood);
router.get('/wood/:id', getWoodById);
router.get('/GetUserWood', authMiddleware, getUserWoodData);
router.put('/wood/:id', updateWood);
router.delete('/wood/:id', deleteWood);
module.exports = router;
