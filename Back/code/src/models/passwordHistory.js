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
  return this.password_history.includes((password) => {
    console.log(password);
    return bcrypt.compareSync(pass, password);
  });
};

// schema.methods.toAuthJSON = function () {
//   const user = this.toJSON();
//   user.token = jwt.generateJWT({
//     uuid: user.uuid,
//     type: 'user',
//   });
//   delete user.password;
//   return user;
// };

// schema.pre('save', function (next) {
//   const user = this;
//   console.log(this);
//   user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
//   user.password_history.push(user.password);
//   return next();
// });

// schema.pre('findOneAndUpdate', function (next) {
//   const updatedParams = this._update;

//   if (updatedParams.password) {
//     let newPassword = bcrypt.hashSync(updatedParams.password, bcrypt.genSaltSync(10));
//     updatedParams.password = newPassword;
//     updatedParams.password_history.push(newPassword);
//   }

//   return next();
// });

module.exports = schema;
