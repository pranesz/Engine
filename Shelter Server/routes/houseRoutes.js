const express = require('express');
const { createHouse, getHouse, getUserHouseData, getHouseById, updateHosue, deleteHouse } = require('../Controller/houseController');
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
router.post(
    "/houses",
    upload.fields([
      { name: "photos", maxCount: 20 },
      { name: "videos", maxCount: 5 },
    ]),createHouse
  );

// router.post('/houses', upload.array('photos', 20), createHouse);
router.get('/houses', getHouse);
router.get('/GetUserHouse', authMiddleware, getUserHouseData);
router.get('/house/:id', getHouseById);
router.put('/house/:id', updateHosue);
router.delete('/house/:id', deleteHouse);

module.exports = router;
