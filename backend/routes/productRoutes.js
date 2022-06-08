const express = require('express');
const router = express.Router();
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  queryProductByType,
  queryProductByCode,
} = require('../controllers/productController');

const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getProducts);
router.route('/create').post(protect, createProduct);
router.route('/:id').delete(protect, deleteProduct).put(updateProduct);
router.route('/queryProductByType').post(protect, queryProductByType);
router.route('/queryProductByCode').post(queryProductByCode);

module.exports = router;
