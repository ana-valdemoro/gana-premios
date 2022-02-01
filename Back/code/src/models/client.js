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
    },
    responsable: {
      required: true,
      type: String,
      unique: true,
    },
    campaign: {
      required: true,
      type: String,
    },
    promotion: {
      type: String,
      default: '',
    },
    active: {
      required: true,
      type: Boolean,
      default: false,
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
