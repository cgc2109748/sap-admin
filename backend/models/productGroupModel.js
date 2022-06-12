const mongoose = require('mongoose');

const productGroupSchema = mongoose.Schema(
  {
    label: {
      type: String,
      required: [true, 'Please add a label value'],
    },
    value: {
      type: String,
      required: [true, 'Please add a value value'],
    },
    code: {
      type: String,
      required: [true, 'Please add a code value'],
    },
    _deleted: {
      type: Boolean,
      required: false,
    },
    createDate: {
      type: String,
      required: [true, 'Please add a createDate value'],
    },
    // updatedDate: {
    //   type: String,
    //   required: [true, 'Please add a updatedDate value'],
    // },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('ProductGroup', productGroupSchema);
