const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const Demo = require('../models/demoModel');

const createDemo = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error('Please add a name field');
  }

  const demo = await Demo.create({
    name: req.body.name,
    password: req.body.password,
  });

  res.status(200).json(demo);
});

module.exports = {
  createDemo,
  // registerUser,
  // loginUser,
  // getMe,
};
