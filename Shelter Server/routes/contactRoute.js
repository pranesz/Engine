const express = require('express');
const { getLimitedContacts } = require('../Controller/ContactController'); // Adjust the path to your controller file
const router = express.Router();






// Contact routes
router.post('/limitedContacts', getLimitedContacts);

module.exports = router;
