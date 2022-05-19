const e = require('express');
const asyncHandler = require('express-async-handler');

const ProductGroup = require('../models/productGroupModel');
// const User = require('../models/userModel')

// @desc    Get ProductGroups
// @route   GET /api/productGroups
// @access  Private
const getProductGroups = asyncHandler(async (req, res) => {
  const ProductGroups = await ProductGroup.find();

  res.status(200).json(ProductGroups);
});

// @desc    Set ProductGroup
// @route   POST /api/productGroups
// @access  Private
const setProductGroup = asyncHandler(async (req, res) => {
  if (!req.body.label) {
    res.status(400);
    throw new Error('Please add a name field');
  }

  const productGroup = await ProductGroup.create({
    label: req.body.label,
    value: req.body.value,
    code: req.body.code,
    createDate: req.body.createDate,
    // updatedDate: req.body.updatedDate,
    // user: req.user.id,
  });

  res.status(200).json(productGroup);
});

// @desc    Update ProductGroup
// @route   PUT /api/productGroups/:id
// @access  Private
const updateProductGroup = asyncHandler(async (req, res) => {
  const productGroup = await ProductGroup.findById(req.params.id);

  if (!productGroup) {
    res.status(400);
    throw new Error('Product not found');
  }

  // Check for user
  // if (!req.user) {
  //   res.status(401);
  //   throw new Error('User not found');
  // }

  // Make sure the logged in user matches the Product user
  // if (Product.user.toString() !== req.user.id) {
  //   res.status(401);
  //   throw new Error('User not authorized');
  // }

  const updatedProductGroup = await ProductGroup.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedProductGroup);
});

// @desc    Delete ProductGroup
// @route   DELETE /api/productGroups/:id
// @access  Private
const deleteProductGroup = asyncHandler(async (req, res) => {
  const productGroup = await ProductGroup.findById(req.params.id);

  if (!productGroup) {
    res.status(400);
    throw new Error('Product not found');
  }

  // Check for user
  // if (!req.user) {
  //   res.status(401);
  //   throw new Error('User not found');
  // }

  // Make sure the logged in user matches the Product user
  // if (Product.user.toString() !== req.user.id) {
  //   res.status(401);
  //   throw new Error('User not authorized');
  // }

  await productGroup.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getProductGroups,
  setProductGroup,
  updateProductGroup,
  deleteProductGroup,
};
