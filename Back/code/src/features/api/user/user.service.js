// eslint-disable-next-line no-unused-vars
const { v4: uuidv4 } = require('uuid');
const { User, UserGroup } = require('../../../models/index');
const jwt = require('../../../utils/middleware/jwt');
// const logger = require('../../../config/winston');
// const sendinblue = require('../../../utils/lib/email');

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

// const activate = async (token, data) => {
//   const payload = jwt.verifyJWT(token);
//   const user = await User.findOne({ where: { uuid: payload.uuid } });
//   return user.update(data);
// };

// const forgotPassword = async (user) => {
//   const token = jwt.generateJWT({
//     uuid: user.uuid,
//     type: 'user',
//   });

//   try {
//     await sendinblue.sendForgotPassword(user, token);
//   } catch (error) {
//     logger.info(`${error}`);const forgotPassword = async (user) => {
//   const token = jwt.generateJWT({
//     uuid: user.uuid,
//     type: 'user',
//   });

//   try {
//     await sendinblue.sendForgotPassword(user, token);
//   } catch (error) {
//     logger.info(`${error}`);
//   }

//   return true;
// };

// const recoveryPassword = async (token, data) => {
//   // TODO: Send email with token 
//   }

//   return true;
// };

// const recoveryPassword = async (token, data) => {
//   // TODO: Send email with token for recovery pass
//   const payload = jwt.verifyJWT(token);
//   const user = await User.findOne({ where: { uuid: payload.uuid } });
//   return user.update(data);
// };

// const getUsers = async (filters, options) =>
//   User.findAll({ where: filters, order: options.order })
//     .then((result) => {
//       console.log(result);
//     })
//     .catch((err) => {
//       throw new Error(err.message);
//     });

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

const putUser = async (uuid, data) => User.findOneAndUpdate(uuid, data, { new: true });

// const deleteUser = async (user) => user.destroy();

module.exports = {
  toPublic,
  getUserRole,
  isUserAuthorized,
  getUserByToken,
  //   activate,
  //   forgotPassword,
  //   recoveryPassword,
  //   getUsers,
  getUserByEmail,
  createUser,
  getUser,
  putUser,
  //   deleteUser,
};
