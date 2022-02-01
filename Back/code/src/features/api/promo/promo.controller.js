/* eslint-disable no-useless-escape */
const boom = require('@hapi/boom');
const { cloneDeep } = require('lodash');
const userService = require('./user.service');
const promoValidator = require('./promo.validator');
const userGroupService = require('../userGroup/userGroup.service');
const activityService = require('../activity/activity.service');
const activityActions = require('./user.activity');
const queryOptions = require('../../../utils/queryOptions');
const userFilters = require('./user.filters');
const sendEmail = require('../../../utils/lib/email');

const jwt = require('../../../utils/middleware/jwt');
const logger = require('../../../config/winston');


const createPromo = async (req, res, next) => {
    promoValidator.createPromo(req.body);
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
  