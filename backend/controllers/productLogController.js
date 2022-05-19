const e = require('express');
const asyncHandler = require('express-async-handler');

const ProductLog = require('../models/productLogModel');
// const User = require('../models/userModel')

// @desc    Get ProductLogs
// @route   GET /api/productLogs
// @access  Private
const getProductLogs = asyncHandler(async (req, res) => {
  const productLogs = await ProductLog.find();

  res.status(200).json(productLogs);
});

// @desc    Set ProductLog
// @route   POST /api/productLogs
// @access  Private
const setProductLog = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error('Please add a name field');
  }

  const productLog = await ProductLog.create({
    name: req.body.name,
    code: req.body.code,
    productType: req.body.productType,
    type: req.body.type,
    num: req.body.num,
    user: req.body.user,
    manager: req.body.manager,
    createDate: req.body.createDate,
    updatedDate: req.body.updatedDate,
  });

  res.status(200).json(productLog);
});

// @desc    Update ProductLog
// @route   PUT /api/productLogs/:id
// @access  Private
const updateProductLog = asyncHandler(async (req, res) => {
  const productLog = await ProductLog.findById(req.params.id);

  if (!productLog) {
    res.status(400);
    throw new Error('ProductLog not found');
  }

  // Check for user
  // if (!req.user) {
  //   res.status(401);
  //   throw new Error('User not found');
  // }

  // Make sure the logged in user matches the ProductLog user
  // if (ProductLog.user.toString() !== req.user.id) {
  //   res.status(401);
  //   throw new Error('User not authorized');
  // }

  const updatedProductLog = await ProductLog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedProductLog);
});

// @desc    Delete ProductLog
// @route   DELETE /api/productLogs/:id
// @access  Private
const deleteProductLog = asyncHandler(async (req, res) => {
  const productLog = await ProductLog.findById(req.params.id);

  if (!productLog) {
    res.status(400);
    throw new Error('ProductLog not found');
  }

  // Check for user
  // if (!req.user) {
  //   res.status(401);
  //   throw new Error('User not found');
  // }

  // Make sure the logged in user matches the ProductLog user
  // if (ProductLog.user.toString() !== req.user.id) {
  //   res.status(401);
  //   throw new Error('User not authorized');
  // }

  await Product.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getProductLogs,
  setProductLog,
  updateProductLog,
  deleteProductLog,
};
