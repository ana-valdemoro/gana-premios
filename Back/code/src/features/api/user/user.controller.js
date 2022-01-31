const boom = require('@hapi/boom');
const { cloneDeep } = require('lodash');
const userService = require('./user.service');
const userGroupService = require('../userGroup/userGroup.service');
const activityService = require('../activity/activity.service');
const activityActions = require('./user.activity');
const queryOptions = require('../../../utils/queryOptions');
const userFilters = require('./user.filters');
const logger = require('../../../config/winston');
const { PARTICIPANTS_RESOURCES } = require('./user.service');

// Private functions
const validatePasswordPattern = (email, password) => {
  // Supported symbols : [:;!@#$%^&*_=+-?¡¿]
  const regex = new RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[-!$%^&*()_+|~=`{}[\]:";'<>\?,.\/]).{9,}$/,
  );
  if (!regex.test(password)) {
    return false;
  }
  // Check if any part of the password matches the email
  const [userName, domain] = email.split('@');
  if (password.includes(userName) || password.includes(domain)) return false;
  return true;
};

const updateLoginAttemps = async (user, attempt) => {
  try {
    await userService.putUser(user.uuid, {
      failed_logins: attempt,
    });
  } catch (error) {
    logger.error(`${error}`);
  }
};

// Public functions
const activate = async (req, res) => {
  const { token } = req.params;

  try {
    if (token !== '') {
      await userService.activate(token, { active: true, token: '' });
    }
  } catch (error) {
    logger.error(`${error}`);
  }

  return res.json({
    status: 'OK',
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let user;

  try {
    user = await userService.getUserByEmail(email);
  } catch (error) {
    logger.error(`${error}`);
    return next(boom.unauthorized('Usuario no válido'));
  }

  if (!user) {
    return next(boom.unauthorized('El email y la contraseña introducidos no son válidos'));
  }
  if (user.failed_logins >= 5) {
    return next(boom.unauthorized('La cuenta ha sido bloqueada'));
  }
  try {
    const userHasValidPassword = await user.validPassword(password);

    if (!userHasValidPassword) {
      const attempt = user.failed_logins + 1;
      await updateLoginAttemps(user, attempt);
      return next(boom.unauthorized('La contraseña es errónea'));
    }
    if (user.failed_logins > 0) {
      await updateLoginAttemps(user, 0);
    }
  } catch (error) {
    logger.error(`${error}`);
    return next(boom.badRequest(error.message));
  }

  let response;

  try {
    response = await user.toAuthJSON();
  } catch (error) {
    logger.error(`${error}`);
    return next(boom.badRequest(error.message));
  }

  return res.json(response);
};

const unlockAccount = async (req, res, next) => {
  const { email } = req.params;

  let user;

  try {
    user = await userService.getUserByEmail(email);
  } catch (error) {
    logger.error(`${error}`);
    return next(boom.unauthorized('Usuario no válido'));
  }
  const unlockedUser = await userService.putUser(user.uuid, {
    failed_logins: 0,
  });
  if (unlockedUser) {
    return res.status(204).json(user.toJSON());
  }
};
const register = async (req, res, next) => {
  const userData = req.body;
  let user;
  try {
    if (!validatePasswordPattern(userData.email, userData.password)) {
      return next(boom.badData('La contraseña no es válida, no cumple el patrón '));
    }
    const searchRole = await userGroupService.getRoleByName('Participants');
    user = await userService.createUser({
      ...userData,
      role_uuid: searchRole.uuid,
      priority: PARTICIPANTS_RESOURCES,
    });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern) {
      const dupField = Object.keys(error.keyValue)[0];
      return next(boom.badData(`Ya existe un usuario con ese ${dupField} introducido`));
    }
    logger.error(`${error}`);
    return next(boom.badData(error.message));
  }

  res.status(201).json(user.toJSON());
};

const forgot = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await userService.getUserByEmail(email);

    if (user) {
      await userService.forgotPassword(user);
    }
  } catch (error) {
    logger.error(`${error}`);
  }

  return res.json({
    status: 'OK',
    msg: 'Si el email existe, se habrá mandado un email con instrucciones para restablecer su contraseña',
  });
};

const recovery = async (req, res) => {
  const { token, password, confirmPassword } = req.body;

  try {
    if (password === confirmPassword) {
      await userService.recoveryPassword(token, { password });
    }
  } catch (error) {
    logger.error(`${error}`);
  }

  return res.json({
    status: 'OK',
  });
};

const listUsers = async (req, res, next) => {
  try {
    const filters = userFilters(req.query);
    const options = queryOptions(req.query);

    options.select = { password: false, _id: false };
    options.leanWithId = false;

    res.json(await userService.getUsers(filters, options));
  } catch (error) {
    logger.error(`${error}`);
    return next(boom.badImplementation(error.message));
  }
};
const createMongoUser = async (req, res, next) => {
  const userData = req.body;
  const userToCreate = { ...userData, role_uuid: '34703d0b-9ad1-42a5-bd42-4565467f54a8' };
  let user;
  try {
    user = await userService.createUser(userToCreate);
  } catch (error) {
    if (error.code === 11000 && error.keyPattern) {
      const dupField = Object.keys(error.keyValue)[0];
      return next(boom.badData(`Ya existe un usuario con ese ${dupField} introducido`));
    }
    logger.error(`${error}`);
    return next(boom.badData(error.message));
  }

  // try {
  //   await activityService.createActivity({
  //     action: activityActions.CREATE_USER,
  //     author: req.user.email,
  //     elementBefore: JSON.stringify({}),
  //     elementAfter: JSON.stringify(user.toJSON()),
  //   });
  // } catch (error) {
  //   logger.error(`${error}`);
  // }

  res.status(201).json(userService.toPublic(user));
};
// const createUser = async (req, res, next) => {
//   const userData = req.body;
//   let user;
//   try {
//     user = await userService.createUser(userData);
//   } catch (error) {
//     if (error instanceof UniqueConstraintError) {
//       return next(boom.badData('Ya existe un usuario con el email introducido'));
//     }
//     logger.error(`${error}`);
//     return next(boom.badData(error.message));
//   }

// try {
//   await activityService.createActivity({
//     action: activityActions.CREATE_USER,
//     author: req.user.email,
//     elementBefore: JSON.stringify({}),
//     elementAfter: JSON.stringify(user.toJSON()),
//   });
// } catch (error) {
//   logger.error(`${error}`);
// }

//   res.status(201).json(userService.toPublic(user));
// };

const getUser = async (req, res, next) => {
  try {
    if (res.locals && res.locals.user) {
      return res.json(await userService.toPublic(res.locals.user));
    }
    res.json(await userService.toPublic(req.user));
  } catch (error) {
    logger.error(`${error}`);
    return next(boom.badImplementation(error.message));
  }
};

const putUser = async (req, res, next) => {
  let { user } = req;
  if (res.locals && res.locals.user) {
    // eslint-disable-next-line prefer-destructuring
    user = res.locals.user;
  }

  const userData = req.body;
  let response;

  try {
    const userUuid = user.uuid;
    delete userData.uuid;
    response = await userService.putUser(userUuid, userData);
  } catch (error) {
    if (error.code === 11000 && error.keyPattern) {
      const dupField = Object.keys(error.keyValue)[0];
      return next(boom.badData(`Ya existe un usuario con ese ${dupField} introducido`));
    }
    logger.error(`${error}`);
    return next(boom.badData(error.message));
  }

  try {
    await activityService.createActivity({
      action: activityActions.UPDATE_USER,
      author: req.user.email,
      elementBefore: JSON.stringify(user.toJSON()),
      elementAfter: JSON.stringify(response.toJSON()),
    });
  } catch (error) {
    logger.error(`${error}`);
  }

  res.json(userService.toPublic(response));
};

const deleteUser = async (req, res, next) => {
  const { user } = res.locals;
  const userBeforeDelete = cloneDeep(user);

  try {
    await userService.deleteUser(user, req.user._id);
  } catch (error) {
    logger.error(`${error}`);
    return next(boom.badImplementation(error.message));
  }

  try {
    await activityService.createActivity({
      action: activityActions.DELETE_USER,
      author: req.user.toJSON(),
      elementBefore: userBeforeDelete.toJSON(),
    });
  } catch (error) {
    logger.error(`${error}`);
  }

  res.status(204).json({});
};

module.exports = {
  activate,
  login,
  register,
  forgot,
  recovery,
  listUsers,
  getUser,
  // createUser,
  putUser,
  deleteUser,
  createMongoUser,
  unlockAccount,
};
