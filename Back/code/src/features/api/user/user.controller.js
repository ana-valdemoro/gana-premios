/* eslint-disable no-useless-escape */
const boom = require('@hapi/boom');
const userService = require('./user.service');
const queryOptions = require('../../../utils/queryOptions');
const userFilters = require('./user.filters');
const logger = require('../../../config/winston');

const activateAccount = async (req, res, next) => {
  const { token } = req.params;
  let activeUser;
  let user;

  try {
    if (token !== '') {
      user = await userService.getUserByToken(token);
    }

    if (!user) {
      return next(boom.unauthorized('Usuario no encontrado'));
    }
  } catch (error) {
    logger.error(`${error}`);
    return next(boom.badImplementation(error.message));
  }

  try {
    activeUser = await userService.activeAccount(user._id);
    console.log(activeUser);

    if (activeUser) {
      return res.status(204).json();
    }
  } catch (error) {
    logger.error(`${error}`);
    return next(boom.badImplementation(error.message));
  }
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
  console.log(userData);
  const userToCreate = { ...userData, role_uuid: 'eafcd4be-b15d-41ce-bd0e-757178955683' };
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
  try {
    const activateUser = await userService.activateAccount(user._id);
    console.log(activateUser);
  } catch (error) {
    logger.error(`${error}`);
    return next(boom.badImplementation(error.message));
  }

  res.status(201).json(userService.toPublic(user));
};

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

  res.json(userService.toPublic(response));
};

const deleteUser = async (req, res, next) => {
  const { user } = res.locals;

  try {
    await userService.deleteUser(user, req.user._id);
  } catch (error) {
    logger.error(`${error}`);
    return next(boom.badImplementation(error.message));
  }

  res.status(204).json({});
};

module.exports = {
  activateAccount,
  forgot,
  recovery,
  listUsers,
  getUser,
  putUser,
  deleteUser,
  createMongoUser,
};
