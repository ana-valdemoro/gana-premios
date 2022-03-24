/* eslint-disable no-param-reassign */
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('../utils/middleware/jwt');

const schema = new mongoose.Schema(
  {
    uuid: {
      required: true,
      type: String,
      unique: true,
    },
    password_history: {
      type: Array,
      default: [],
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

schema.methods.validPassword = function (pass) {
  return bcrypt.compareSync(pass, this.password);
};

schema.methods.isPasswordIncluded = function(pass) {
  return this.password_history.some((password) => {
    return bcrypt.compareSync(pass, password);
  });
};

module.exports = schema;
