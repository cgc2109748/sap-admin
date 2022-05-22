const express = require('express');
const router = express.Router();
const { upload } = require('../controllers/uploadController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, upload);

module.exports = router;
