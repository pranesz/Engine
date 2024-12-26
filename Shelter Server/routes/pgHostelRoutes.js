const express = require('express');
const { createPgHostel, getPg, getUserPgData, getPgHostelById, updatePgHostel, deletePgHostel } = require('../Controller/pgHostelController');
const multer = require('multer');
const authMiddleware = require("../middleware/authmiddleware");

const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.post('/pgHostel', upload.array('photos', 20), createPgHostel);
router.get('/pgHostel', getPg);
router.get('/pgHostel/:id', getPgHostelById);
router.get('/GetUserPG', authMiddleware, getUserPgData);
router.put('/pghostel/:id', updatePgHostel);
router.delete('/pghostel/:id', deletePgHostel);

module.exports = router;