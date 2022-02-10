const boom = require('@hapi/boom');
const userService = require('../user/user.service');
const logger = require('../../../config/winston');
const { validatePasswordPattern } = require('../../../utils/passwordValidator');
const { PARTICIPANTS_RESOURCES } = require('../user/user.service');
const userGroupService = require('../userGroup/userGroup.service');
const jwt = require('../../../utils/middleware/jwt');

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
    return next(boom.unauthorized('El email y la contraseña introducidos no son válidos'));
  }

  if (user.blocked) {
    return next(
      boom.unauthorized('Esta cuenta esta bloqueada. Revisa la bandeja de entrada de tu correo'),
    );
  }

  try {
    if (user.failed_logins >= 5) {
      await userService.blockAccount(user);
      return next(
        boom.unauthorized(
          'La cuenta ha sido bloqueada y se ha enviado un correo para desbloquearla',
        ),
      );
    }
  } catch (error) {
    console.log(error);
    return next(boom.badImplementation(error.message));
  }
  try {
    const userHasValidPassword = await user.validPassword(password);

    if (!userHasValidPassword) {
      await userService.incrementLoginAttempts(user._id);
      return next(boom.unauthorized('La contraseña es errónea'));
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
      return next(boom.unauthorized('Usuario no válido'));
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
  const userData = req.body;
  let user;

  const isValidPassword = validatePasswordPattern(userData.email, userData.password);

  if (!isValidPassword.status) {
    const errorResponse = {
      statusCode: 422,
      message: 'Contraseña inválida',
      errors: isValidPassword.errors,
    };
    return res.status(422).json(errorResponse);
  }

  try {
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

  return res.status(201).json(user.toJSON());
};

module.exports = {
  login,
  register,
  unBlockAccount,
};
