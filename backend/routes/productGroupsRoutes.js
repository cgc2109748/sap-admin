const express = require('express');
const router = express.Router();
const {
  getProductGroups,
  setProductGroup,
  updateProductGroup,
  deleteProductGroup,
} = require('../controllers/productGroupsController');

const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getProductGroups);
router.route('/create').post(protect, setProductGroup);
router.route('/:id').delete(protect, deleteProductGroup).put(protect, updateProductGroup);

module.exports = router;
