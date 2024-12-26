const express = require('express');
const { registerUser } = require('../Controller/registerController');
const router = express.Router();

// POST route for user registration
router.post('/register', registerUser);

module.exports = router;

