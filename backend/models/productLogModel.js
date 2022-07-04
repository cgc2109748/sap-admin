const mongoose = require('mongoose');

const productLogSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name value'],
    },
    code: {
      type: String,
      required: [true, 'Please add a code value'],
    },
    productType: {
      type: String,
      required: [true, 'Please add a type productType'],
    },
    user: {
      type: String,
      required: [false, 'Please add a used user'],
    },
    type: {
      type: String,
      required: [true, 'Please add a type type'],
    },
    num: {
      type: String,
      required: [true, 'Please add a total num'],
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
    remark: {
      type: String,
      required: false
    },
    usage: {
      type: String,
      required: false
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('ProductLog', productLogSchema);
