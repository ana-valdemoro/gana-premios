// const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const db = require('../config/db');

const { User, UserGroup } = require('../models/index');

// connection with database
db.connect();

const password = bcrypt.hashSync('123456', bcrypt.genSaltSync(10));

/*     if (superAdminGroup.length > 0) {
      superAdminGroup = superAdminGroup.pop(); */

const seedDB = async () => {
  const adminGroup = await UserGroup.findOne({ name: 'Admin' });
  console.log(adminGroup);
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
  };
  await User.deleteMany({});
  await User.insertMany(seedAdminShema);
};

// Seed
seedDB().then(() => {
  db.disconnect();
});

/* const uuid = require('uuid');
const bcrypt = require('bcrypt');
const { UserGroup } = require('../models');

module.exports = {
  up: async (queryInterface) => {
    try {
      await queryInterface.bulkInsert('user_groups', [
        {
          uuid: uuid.v4(),
          name: 'Superadmin',
          permissions: 'SUPERADMIN',
        },
      ]);

      let superAdminGroup = await UserGroup.findAll({ where: { name: 'Superadmin' } });

      if (superAdminGroup.length > 0) {
        superAdminGroup = superAdminGroup.pop();
      }

      const password = bcrypt.hashSync('123456', bcrypt.genSaltSync(10));

      await queryInterface.bulkInsert('users', [
        {
          uuid: uuid.v4(),
          name: 'Administrador',
          email: 'admin@admin.com',
          password,
          role_uuid: superAdminGroup.uuid,
          token: '',
          active: true,
        },
      ]);
    } catch (e) {
      console.log(e);
    }
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('user_groups', null, {});
  },
};
 */
