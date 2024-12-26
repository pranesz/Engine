const express = require('express');
const multer = require('multer');
const { createPipeWirePost, getAllPipeWire, getUserPipeWireData, getPipeWireById, deletePipeWires, updatePipeWires } = require('../Controller/pipeWireController');
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

// POST route for submitting pipe and wire post
router.post('/pipewires', upload.array('images', 5), createPipeWirePost);
router.get('/pipewires', getAllPipeWire);
router.get('/pipewire/:id', getPipeWireById);
router.get('/GetUserPipewire', authMiddleware, getUserPipeWireData);
router.put('/pipewires/:id', updatePipeWires);
router.delete('/pipewires/:id', deletePipeWires);
module.exports = router;
