const express = require('express');
const router = express.Router();
const {
  getProductLogs,
  setProductLog,
  updateProductLog,
  deleteProductLog,
} = require('../controllers/productLogController');

const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getProductLogs);
router.route('/create').post(setProductLog);
router.route('/:id').delete(protect, deleteProductLog).put(protect, updateProductLog);

module.exports = router;
