const mongoose = require('mongoose');
const UserSchema = require('./user');
const UserGroupSchema = require('./userGroup');
const ClientSchema = require('./client');
const CampaignSchema = require('./campaign');

const models = {
  //   Activity: Activity.init(Sequelize, sequelize),
  User: mongoose.model('User', UserSchema),
  UserGroup: mongoose.model('UserGroups', UserGroupSchema),
  Client: mongoose.model('Client', ClientSchema),
  Campaign: mongoose.model('Campaign', CampaignSchema),
};

// We export the models variable to be used in App.
module.exports = models;
