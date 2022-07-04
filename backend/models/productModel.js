const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name value'],
    },
    img: {
      type: String,
      required: false,
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
      required: false,
    },
    left: {
      type: String,
      required: false,
    },
    unit: {
      type: String,
      required: false,
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
      required: false,
    },
    updatedDate: {
      type: String,
      required: false,
    },
    manager: {
      type: String,
      required: [true, 'Please add a manager value'],
    },
    qrCode: {
      type: String,
      required: false,
    },
    amountOfBorrow: {
      type: String,
      required: false,
    },
    _deleted: {
      type: Boolean,
      required: false,
    },
    remark: {
      type: String,
      required: false
    },
    place: {
      type: String,
      required: false
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Product', productSchema);
