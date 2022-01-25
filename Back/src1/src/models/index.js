const mongoose = require('mongoose');
// const Sequelize = require('../config/db');

// const Activity = require('./activity');
const UserSchema = require('./user');
const UserGroupSchema = require('./userGroup');

const models = {
  //   Activity: Activity.init(Sequelize, sequelize),
  User: mongoose.model('User', UserSchema),
  UserGroup: mongoose.model('UserGroups', UserGroupSchema),
};

// Object.values(models)
//   .filter((model) => typeof model.associate === 'function')
//   .forEach((model) => model.associate(models));

// const db = {
//   ...models,
//   Sequelize,
// };

// We export the models variable to be used in App.
module.exports = models;
