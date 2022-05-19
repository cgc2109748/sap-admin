const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      required: [true, 'Please add a name value'],
    },
    code: {
      type: String,
      required: [true, 'Please add a code value'],
    },
    type: {
      type: String,
      required: [true, 'Please add a type value'],
    },
    status: {
      type: String,
      required: [true, 'Please add a status value'],
    },
    total: {
      type: String,
      required: [true, 'Please add a total value'],
    },
    used: {
      type: String,
      required: [false, 'Please add a used value'],
    },
    left: {
      type: String,
      required: [false, 'Please add a left value'],
    },
    unit: {
      type: String,
      required: [false, 'Please add a unit value'],
    },
    price: {
      type: String,
      required: [true, 'Please add a price value'],
    },
    totalPrice: {
      type: String,
      required: [true, 'Please add a totalPrice value'],
    },
    createDate: {
      type: String,
      required: [true, 'Please add a createDate value'],
    },
    updatedDate: {
      type: String,
      required: [false, 'Please add a updatedDate value'],
    },
    manager: {
      type: String,
      required: [true, 'Please add a manager value'],
    },
    qrCode: {
      type: String,
      required: [false, 'Please add a qrCode value'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Product', productSchema);
