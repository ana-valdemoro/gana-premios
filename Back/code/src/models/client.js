const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    uuid: {
      required: true,
      type: String,
      unique: true,
    },
    name: {
      required: true,
      type: String,
      unique: true
    },
    responsable: {
      required: true,
      type: String,
    },
    number_promotion_active: {
      required: true,
      type: Number,
    },
    deleted: {
      required: true,
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = schema;
