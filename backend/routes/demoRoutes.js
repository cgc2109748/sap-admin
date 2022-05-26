const express = require('express');
const router = express.Router();
const { createDemo } = require('../controllers/demoController');
const { protect } = require('../middleware/authMiddleware');

// router.post('/createDemo', createDemo);
router.route('/craeteDemo').post(protect, createDemo);

module.exports = router;
