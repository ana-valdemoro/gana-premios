/* eslint-disable no-useless-escape */
const boom = require('@hapi/boom');
const userService = require('./user.service');
const queryOptions = require('../../../utils/queryOptions');
const userFilters = require('./user.filters');
const logger = require('../../../config/winston');
const jwt = require('../../../utils/middleware/jwt');
const mediaService = require('../media/media.service');
const userGroupService = require('../userGroup/userGroup.service');
const { MANAGER_RESOURCES } = require('./user.service');
const { validatePasswordPattern } = require('../../../utils/passwordValidator');
const { getTranslation } = require('../../../utils/getTranslation');
const passwordHistoryService = require('../passwordHistory/passwordHistory.service');

/*Private functions */
const undoCreateLopd = async (media) => {
  try {
    await mediaService.deleteMedia(media.uuid);
  } catch (error) {
    logger.error(`${error}`);
  }
};

/*Public functions*/
const activateAccount = async (req, res, next) => {
  const { token } = req.params;
  let activeUser;
  let user;

  try {
    if (token !== '') {
      user = await userService.getUserByToken(token);
    }

    if (!user) {
      return next(boom.unauthorized(res.__('userNotFound')));
    }
  } catch (error) {
    logger.error(`${error}`);
    return next(boom.badImplementation(error.message));
  }

  try {
    activeUser = await userService.activeAccount(user._id);

    if (activeUser) {
      return res.status(204).json();
    }
  } catch (error) {
    logger.error(`${error}`);
    return next(boom.badImplementation(error.message));
  }
};

const forgotPassword = async (req, res) => {
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
    msg: res.__('forgotPassword'),
  });
};

const recovery = async (req, res, next) => {
  const { password } = req.body;
  const { token } = req.params;
  let user;

  try {
    const payload = jwt.verifyJWT(token);
  } catch (error) {
    logger.error(`${error}`);
    return next(boom.forbidden(res.__('resetPasswordInvalid')));
  }

  try {
    user = await userService.getUserByToken(token);

    if (!user) {
      return next(boom.forbidden(res.__('resetPasswordUsed')));
    }
  } catch (error) {
    logger.error(`${error}`);
    return next(boom.badImplementation(error.message));
  }

  const { status, errors } = validatePasswordPattern(user.email, password);
  if (!status) {
    const errorResponse = {
      statusCode: 422,
      message: res.__('invalidPassword2'),
      errors: errors.map((key) => res.__(key)),
    };
    return res.status(422).json(errorResponse);
  }

  try {
    passwordHistory = await passwordHistoryService.getPasswordHistory(user.password_history_uuid);
  } catch (error) {
    console.log(error);
    return next(boom.badImplementation());
  }

  if (!passwordHistory) return next(boom.notFound(res.__('passwordHistoryNotFound')));

  if(passwordHistory.isPasswordIncluded(password)){
    return next(boom.badData(res.__('passwordUsed')));
  }

  try {
    passwordHistory = await passwordHistoryService.addPasswordToHistory(passwordHistory._id, password);
  } catch (error) {
    logger.error(`${error}`);
    return next(boom.badImplementation());
  }

  if (!passwordHistory) return next(boom.notFound(res.__('passwordHistoryNotUpdated')));


  try {
    await userService.recoveryPassword(user, password);
    return res.json({
      status: 'OK',
    });
  } catch (error) {
    logger.error(`${error}`);
    return next(boom.badImplementation(res.__('noUpdatePassword')));
  }
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

const createManagerUser = async (req, res, next) => {
  const userData = req.body;
  let user;

  const { status, errors } = validatePasswordPattern(userData.email, userData.password);

  if (!status) {
    const errorResponse = {
      statusCode: 422,
      message: res.__('invalidPassword2'),
      errors: errors.map((key) => res.__(key)),
    };
    return res.status(422).json(errorResponse);
  }

  try {
    const searchRole = await userGroupService.getRoleByName('Managers');

    user = await userService.createUser({
      ...userData,
      role_uuid: searchRole.uuid,
      priority: MANAGER_RESOURCES,
    });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern) {
      const dupField = Object.keys(error.keyValue)[0];
      return next(boom.badData(`Ya existe un usuario con ese ${dupField} introducido`));
    }

    logger.error(`${error}`);
    return next(boom.badData(error.message));
  }

  try {
    await userService.activateAccount(user);
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

const createLopd = async (req, res, next) => {
  const { fileName, mediaType, uri } = req.body;
  let media;
  const { user } = req;
  let newUser;

  try {
    media = await mediaService.createMedia(fileName, mediaType, uri);
  } catch (error) {
    logger.error(`${error}`);
    return next(boom.badImplementation(error.message));
  }

  try {
    newUser = await userService.putUser(user._id, { lopd_uuid: media.uuid });
  } catch (error) {
    await undoCreateLopd(media);
    logger.error(`${error}`);
    return next(boom.badImplementation(error.message));
  }

  return res.json(await mediaService.toPublic(media));
};

const getLopd = async (req, res, next) => {
  const { user } = req;
  let media;
  let path;

  if (user.lopd_uuid === '') {
    return next(boom.badData(getTranslation('noLOPD', user.language)));
    // res.__('noLOPD', user.language)));
  }

  try {
    media = await mediaService.getMedia(user.lopd_uuid);
  } catch (error) {
    logger.error(`${error}`);
    return next(boom.badImplementation(error.message));
  }

  try {
    path = await mediaService.getMediaPath(media);
  } catch (error) {
    logger.error(`${error}`);
    return next(boom.badImplementation(error.message));
  }
  res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition');
  res.set('Content-Disposition', 'application/pdf');

  return res.download(path, media.original_file_name);
};

module.exports = {
  activateAccount,
  forgotPassword,
  recovery,
  listUsers,
  getUser,
  putUser,
  deleteUser,
  createLopd,
  getLopd,
  createManagerUser,
};
