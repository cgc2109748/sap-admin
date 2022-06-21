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

router.route('/').get(getProducts);
router.route('/create').post(createProduct);
router.route('/:id').delete(protect, deleteProduct).put(updateProduct);
router.route('/queryProductByType').post(queryProductByType);
router.route('/queryProductByCode').post(queryProductByCode);

module.exports = router;
