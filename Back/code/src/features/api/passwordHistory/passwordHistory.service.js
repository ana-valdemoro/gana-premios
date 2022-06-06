// eslint-disable-next-line no-unused-vars
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const { PasswordHistory } = require('../../../models/index');

const toPublic = (passwordHistory) => passwordHistory.toJSON();

const createPasswordHistory = async (password) => {
  const encriptedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const password_history = [encriptedPassword];
  const dataToCreate = { password_history, uuid: uuidv4() };
  return PasswordHistory.create(dataToCreate);
};

const getPasswordHistory = async (uuid) => PasswordHistory.findOne({ uuid });

const addPasswordToHistory = async (id, password) =>
  PasswordHistory.findByIdAndUpdate(
    { _id: id },
    { $push: { password_history: bcrypt.hashSync(password, bcrypt.genSaltSync(10)) } },
    { new: true },
  );

module.exports = {
  toPublic,
  createPasswordHistory,
  getPasswordHistory,
  addPasswordToHistory,
};
