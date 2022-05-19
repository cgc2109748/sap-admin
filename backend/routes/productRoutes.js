const express = require('express');
const router = express.Router();
const {
  getProducts,
  setProduct,
  updateProduct,
  deleteProduct,
  queryProductByType,
} = require('../controllers/productController');

const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getProducts);
router.route('/create').post(protect, setProduct);
router.route('/:id').delete(protect, deleteProduct).put(protect, updateProduct);
router.route('/queryProductByType').post(protect, queryProductByType);

module.exports = router;
