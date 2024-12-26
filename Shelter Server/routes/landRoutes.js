// const express = require("express");
// const { createLand, getAllLands, getLandById, getLandsByUserId, updateLand, deleteLand, getUserLandData } = require("../Controller/landController");
// const multer = require("multer");
// const router = express.Router();

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "uploads/"); 
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + "-" + file.originalname);
//     },
// });
// const upload = multer({ storage });

// router.post("/land", upload.array("photos", 20), createLand);
// router.get("/lands", getAllLands); 
// router.get("/land/:id", getLandById); 
// router.get("/land/:userId/", getLandsByUserId); 
// router.put("/land/:id", upload.array("photos", 20), updateLand); 
// router.delete("/land/:id", deleteLand); 
// router.get('/GetUserLand', authMiddleware, getUserLandData);

// module.exports = router;





const express = require("express");
const path = require("path"); // <-- Add this line
const { createLand, getAllLands, getLandById, getLandsByUserId, updateLand, deleteLand, getUserLandData } = require("../Controller/landController");
const multer = require("multer");
const authMiddleware = require("../middleware/authmiddleware");


const router = express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // specify destination for uploaded files
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // name file with timestamp to avoid name conflicts
    }
  });
  
  const upload = multer({
    storage: storage,
    // You can define multiple fields here
    fields: [
      { name: 'photos', maxCount: 5 },  // Expecting 'photos' field
      { name: 'videos', maxCount: 2 },  // Expecting 'videos' field
    ]
  });
  
  // Define the route
//   router.post("/land", upload, createLand);

router.post('/land', upload.any(), createLand);
// router.post("/land", upload.array("photos", 20), createLand);
router.get("/lands", getAllLands); 
router.get("/land/:id", getLandById); 
router.get("/land/:userId/", getLandsByUserId); 
router.put("/land/:id", upload.array("photos", 20), updateLand); 
router.delete("/land/:id", deleteLand); 
router.get('/GetUserLand', authMiddleware, getUserLandData); // Using the imported authMiddleware here

module.exports = router;
