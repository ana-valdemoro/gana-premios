// eslint-disable-next-line no-unused-vars
const { v4: uuidv4 } = require('uuid');
const { User, UserGroup } = require('../../../models/index');
const jwt = require('../../../utils/middleware/jwt');

const ALL = 2;
const MANAGER_RESOURCES = 1;
const PARTICIPANTS_RESOURCES = 0;

const toPublic = (user) => user.toJSON();

const getUserRole = async (user) => UserGroup.findOne({ uuid: user.role_uuid });

const isUserAuthorized = async (user, role) => {
  console.log(`user: ${JSON.stringify(user)}`);
  const group = await getUserRole(user);

  const userRights = group.permissions.split(',');
  const [roleResource] = role.split(':');

  return (
    userRights.includes('ADMIN') ||
    userRights.includes(`${roleResource}:all`) ||
    userRights.includes(role)
  );
};

const getUserByToken = async (token) => User.findOne({ token });

const getUserByEmail = async (email) => User.findOne({ email });

const getUser = async (uuid) => User.findOne({ uuid });

const createUser = async (data) => {
  const dataToCreate = {
    ...data,
    token: jwt.generateJWT({ uuid: '', type: 'user' }),
    uuid: uuidv4(),
  };
  return User.create(dataToCreate);
};

const putUser = async (id, data) => User.findOneAndUpdate({ _id: id }, data, { new: true });

const incrementLoginAttempts = async (id) =>
  User.findOneAndUpdate({ _id: id }, { $inc: { failed_logins: 1 } }, { new: true });

const resetLoginAttempts = async (id) => User.findOneAndUpdate({ _id: id }, { failed_logins: 0 });

// const deleteUser = async (user) => user.destroy();

module.exports = {
  toPublic,
  getUserRole,
  isUserAuthorized,
  getUserByToken,
  getUserByEmail,
  createUser,
  getUser,
  putUser,
  incrementLoginAttempts,
  resetLoginAttempts,
  ALL,
  MANAGER_RESOURCES,
  PARTICIPANTS_RESOURCES,
};
