/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    uuid: {
      type: String,
      unique: true,
    },
    path: {
      required: true,
      type: String,
    },
    url: {
      required: true,
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret._id;
      },
    },
  },
);

module.exports = schema;
