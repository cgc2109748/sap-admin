const e = require('express');
const asyncHandler = require('express-async-handler');

const Product = require('../models/productModel');
// const User = require('../models/userModel')

// @desc    Get Products
// @route   GET /api/products
// @access  Private
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();

  res.status(200).json(products);
});

// @desc    Set Product
// @route   POST /api/products
// @access  Private
const setProduct = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error('Please add a name field');
  }

  const product = await Product.create({
    name: req.body.name,
    code: req.body.code,
    type: req.body.type,
    status: req.body.status,
    unit: req.body.unit,
    total: req.body.total,
    price: req.body.price,
    totalPrice: req.body.totalPrice,
    used: '0',
    left: req.body.total,
    manager: req.body.manager,
    createDate: req.body.createDate,
    updatedDate: req.body.updatedDate,
    // qrCode: req.body.qrCode,
  });

  res.status(200).json(product);
});

// @desc    Update Product
// @route   PUT /api/products/:id
// @access  Private
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
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

  const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedProduct);
});

// @desc    Delete Product
// @route   DELETE /api/products/:id
// @access  Private
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
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

  await Product.remove();

  res.status(200).json({ id: req.params.id });
});

// @desc    Query Product by type
// @route   DELETE /api/queryProductByType
// @access  Private

const queryProductByType = asyncHandler(async (req, res) => {
  const proucts = await Product.find({
    type: req.body.type,
  });

  res.status(200).json(proucts);
});

module.exports = {
  getProducts,
  setProduct,
  updateProduct,
  deleteProduct,
  queryProductByType,
};