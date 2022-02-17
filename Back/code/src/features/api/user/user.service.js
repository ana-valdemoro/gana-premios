// eslint-disable-next-line no-unused-vars
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const { User, UserGroup } = require('../../../models/index');
const jwt = require('../../../utils/middleware/jwt');
const logger = require('../../../config/winston');
const mailService = require('../../../utils/lib/email');

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

// Activación de cuenta

const activateAccount = async (user, language) => {
  try {
    await mailService.sendActiveAccountEmail(user.email, user.token, language);
  } catch (error) {
    logger.info(`${error}`);
    return Promise.reject(new Error('Ha fallado el envio de email'));
  }

  return true;
};

const activeAccount = async (id) => {
  const data = {
    active: true,
    token: '',
  };
  return putUser(id, data);
};

// Olvidar contraseña

const forgotPassword = async (user) => {
  const token = jwt.generateJWT({
    uuid: user.uuid,
    type: 'user',
  });

  try {
    await mailService.sendRecoveryPasswordEmail(user.email, token);
  } catch (error) {
    logger.info(`${error}`);
  }

  return true;
};

// Recuperación de contraseña

const recoveryPassword = async (token, password) => {
  const payload = jwt.verifyJWT(token);
  // const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const user = await User.findOneAndUpdate({ uuid: payload.uuid }, { password });
  return user;
};

const incrementLoginAttempts = async (id) =>
  User.findOneAndUpdate({ _id: id }, { $inc: { failed_logins: 1 } }, { new: true });

const resetLoginAttempts = async (id) => User.findOneAndUpdate({ _id: id }, { failed_logins: 0 });

const blockAccount = async (user) => {
  const token = jwt.generateJWT({
    uuid: '',
    type: 'user',
  });

  try {
    const updatedUser = await putUser(user._id, {
      blocked: true,
      token,
    });
    if (!updatedUser) {
      return Promise.reject(new Error('No se ha actualizado el usuario'));
    }
  } catch (error) {
    logger.error(`${error}`);
    return Promise.reject(new Error('Ha fallado la BBDD'));
  }

  try {
    await mailService.sendBlockedAccountEmail(user.email, token);
  } catch (error) {
    logger.info(`${error}`);
    return Promise.reject(new Error('Ha fallado el envio de email'));
  }

  return true;
};

const unBlockAccount = async (id) => {
  const data = {
    failed_logins: 0,
    token: '',
    blocked: false,
  };
  return putUser(id, data);
};
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
  // activate,
  activateAccount,
  activeAccount,
  forgotPassword,
  recoveryPassword,
  incrementLoginAttempts,
  resetLoginAttempts,
  blockAccount,
  unBlockAccount,
  ALL,
  MANAGER_RESOURCES,
  PARTICIPANTS_RESOURCES,
};
