const express = require("express");
const { createSandPost, getAllSand, getUserSandData, getSandById, updateSand, deleteSand } = require("../Controller/sandController");
const multer = require("multer");
const path = require("path");
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

// @route   POST /api/sandPosts
// @desc    Create a new sand post
router.post("/sand", upload.array("images", 10), createSandPost);
router.get('/sand', getAllSand);
router.get('/sand/:id', getSandById);
router.get('/GetUserSand', authMiddleware, getUserSandData);
router.put('/sand/:id', updateSand);
router.delete('/sand/:id', deleteSand);
module.exports = router;
