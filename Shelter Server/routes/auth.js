const express = require("express");
const { register, login, validateToken, getProfile, updateProfile } = require("../Controller/authController")
const authMiddleware = require("../middleware/authmiddleware");
const multer = require('multer');
const path = require('path');
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage: storage });

router.post('/register', upload.single('profileImage'), register);
router.post("/login", login);
router.post('/validateToken', validateToken)
router.get('/getprofile', authMiddleware, getProfile);
router.put('/updateprofile', authMiddleware, upload.single('profileImage'), updateProfile);


module.exports = router;