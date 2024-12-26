const express = require('express');
const multer = require('multer');
const { createCatering, getAllCateringPosts, getUserCateringData, getCateringById, updateCatering, deleteCatering } = require('../Controller/cateringController');
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

// POST route for submitting a catering post
router.post('/catering', upload.array('images', 5), createCatering);
router.get('/catering/:id', getCateringById);
router.get('/catering', getAllCateringPosts);
router.get('/GetUserCatering', authMiddleware, getUserCateringData);
router.put('/catering/:id', updateCatering);
router.delete('/catering/:id', deleteCatering);

module.exports = router;
