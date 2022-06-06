// const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const db = require('../config/db');
const { User, UserGroup, PasswordHistory } = require('../models/index');

// connection with database
db.connect();

const password = bcrypt.hashSync('Domingo_31', bcrypt.genSaltSync(10));

const seedDB = async () => {
  //First create password_history of admin user
  await PasswordHistory.deleteMany({});
  const seedAdminPasswordHistory = {
    uuid: uuid.v4(),
    password_history: [password],
  };

  let passHistory = await PasswordHistory.insertMany(seedAdminPasswordHistory);

  //Second we populate users collection
  const adminGroup = await UserGroup.findOne({ name: 'Admin' });

  if (!adminGroup) {
    throw new Error('no se ha encontrado');
  }

  const seedAdminShema = {
    uuid: uuid.v4(),
    name: 'Administrador',
    email: 'admin@admin.com',
    password,
    role_uuid: adminGroup.uuid,
    token: '',
    active: true,
    priority: 2,
    blocked: false,
    password_history_uuid: passHistory[0].uuid,
  };
  await User.deleteMany({});
  await User.insertMany(seedAdminShema);
};

// Seed
seedDB().then(() => {
  db.disconnect();
});
