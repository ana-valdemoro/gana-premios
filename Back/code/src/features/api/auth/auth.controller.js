const boom = require('@hapi/boom');
const userService = require('../user/user.service');
const logger = require('../../../config/winston');
const { validatePasswordPattern } = require('../../../utils/passwordValidator');
const { PARTICIPANTS_RESOURCES } = require('../user/user.service');
const userGroupService = require('../userGroup/userGroup.service');
const passwordHistoryService = require('../passwordHistory/passwordHistory.service');

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let user;

  try {
    user = await userService.getUserByEmail(email);
  } catch (error) {
    logger.error(`${error}`);
    return next(boom.badImplementation(error.message));
  }

  
  if (!user) {
    return next(boom.unauthorized(res.__('invalidMailOrPassword')));
  }
  
  if (!user.active) {
    return next(
      boom.unauthorized(res.__('inactiveUser')),
    );
  }

  if (user.blocked) {
    return next(boom.unauthorized(res.__('lockedAccountcheckMail')));
  }

  try {
    if (user.failed_logins >= 5 && !user.blocked) {
      await userService.blockAccount(user);
      return next(boom.unauthorized(res.__('lockedAccount')));
    }
  } catch (errorKey) {
    return next(boom.badData(res.__(errorKey)));
  }
  try {
    const userHasValidPassword = await user.validPassword(password);

    if (!userHasValidPassword) {
      await userService.incrementLoginAttempts(user._id);
      return next(boom.unauthorized(res.__('invalidMailOrPassword')));
    }

    if (user.failed_logins > 0) {
      await userService.resetLoginAttempts(user._id);
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

const unBlockAccount = async (req, res, next) => {
  const { token } = req.params;
  let unBlockedUser;
  let user;

  try {
    if (token !== '') {
      user = await userService.getUserByToken(token);
    }

    if (!user) {
      return next(boom.unauthorized(res.__('invalidUser')));
    }
  } catch (error) {
    logger.error(`${error}`);
    return next(boom.badImplementation(error.message));
  }

  try {
    unBlockedUser = await userService.unBlockAccount(user._id);
    console.log(unBlockedUser);

    if (unBlockedUser) {
      return res.status(204).json();
    }
  } catch (error) {
    logger.error(`${error}`);
    return next(boom.badImplementation(error.message));
  }
};

const register = async (req, res, next) => {
  const language = req.headers['accept-language'];
  const userData = req.body;
  let user;
  let passwordHistory;

  const isValidPassword = validatePasswordPattern(userData.email, userData.password);

  if (!isValidPassword.status) {
    const errorResponse = {
      statusCode: 422,
      message: res.__('invalidPassword2'),
      errors: isValidPassword.errors.map( key => res.__(key)),
    };
    return res.status(422).json(errorResponse);
  }

  try {
    passwordHistory = await  passwordHistoryService.createPasswordHistory(userData.password);
  } catch (error) {
    logger.error(`${error}`);
    return next(boom.badData(error.message));
  }

  try {
    const searchRole = await userGroupService.getRoleByName('Participants');

    user = await userService.createUser({
      ...userData,
      role_uuid: searchRole.uuid,
      priority: PARTICIPANTS_RESOURCES,
      password_history_uuid: passwordHistory.uuid,
    });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern) {
      const dupField = Object.keys(error.keyValue)[0];
      return next(boom.badData(res.__('duplicateField', dupField)));
    }
    logger.error(`${error}`);
    return next(boom.badData(error.message));
  }

  try {
    await userService.activateAccount(user, language);
  } catch (error) {
    logger.error(`${error}`);
    return next(boom.badData(res.__('mailNotSent')));
  }

  return res.status(201).json(user.toJSON());
};

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
    console.log(activeUser);

    if (activeUser) {
      return res.status(204).json();
    }
  } catch (error) {
    logger.error(`${error}`);
    return next(boom.badImplementation(error.message));
  }
};

const updateProfile = async (req, res, next) => {
  const { user } = req;
  const { lopdUuid, name, email, password } = req.body;
  let response;
  let passwordHistory;

  if (password) {
    const isValidPassword = validatePasswordPattern(email, password);

    if (!isValidPassword.status) {
      const errorResponse = {
        statusCode: 422,
        message: res.__('invalidPassword2'),
        errors: isValidPassword.errors.map( key => res.__(key)),
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

  }

  try {
    const userData = { lopd_uuid: lopdUuid, name, email, password };
    response = await userService.putUser(user._id, userData);
  } catch (error) {
    if (error.code === 11000 && error.keyPattern) {
      const dupField = Object.keys(error.keyValue)[0];
      return next(boom.badData(res.__('duplicateField', dupField)));
    }
    logger.error(`${error}`);
    return next(boom.badData(error.message));
  }

  res.json(userService.toPublic(response));
};

const getProfile = async (req, res, next) => {
  const { user } = req;

  try {
    return res.json(await userService.toPublic(user));
  } catch (error) {
    logger.error(`${error}`);
    return next(boom.badImplementation(error.message));
  }
};

module.exports = {
  login,
  register,
  unBlockAccount,
  activateAccount,
  updateProfile,
  getProfile,
};
