/* eslint-disable import/no-unresolved */
const boom = require('@hapi/boom');
const { cloneDeep } = require('lodash');

const { UniqueConstraintError } = require('sequelize');

const promotionService = require('./promotion.service');
const activityService = require('../activity/activity.service');
const activityActions = require('./promotion.activity');
const queryOptions = require('../../../utils/queryOptions');
const promotionFilters = require('./promotion.filters');
const logger = require('../../../config/winston');

const listPromotions = async (req, res, next) => {
  try {
    const filters = promotionFilters(req.query);
    const options = queryOptions(req.query);

    res.json(await promotionService.getPromotions(filters, options));
  } catch (error) {
    logger.error(`${error}`);
    return next(boom.badImplementation(error.message));
  }
};

const getPromotion = async (req, res, next) => {
  const { promotionUuid } = req.params;
  console.log(promotionUuid);
  try {
    const promotion = await promotionService.getClient(promotionUuid);
    console.log(promotion);
    if (promotionUuid) {
      return res.json(promotion);
    }
    res.json(await promotionService.getPromotion(req.promotion));
  } catch (error) {
    logger.error(`${error}`);
    return next(boom.badImplementation(error.message));
  }
};

const createPromotion = async (req, res, next) => {
  const promotionData = req.body;

  let promotion;
  try {
    promotion = await promotionService.createClient(promotionData);
  } catch (error) {
    if (error instanceof UniqueConstraintError) {
      return next(boom.badData('Ya existe esta promoción'));
    }
    logger.error(`${error}`);
    return next(boom.badData(error.message));
  }
  /* try {
    await activityService.createActivity({
      action: activityActions.CREATE_CLIENT,
      author: req.user.email,
      elementBefore: JSON.stringify({}),
      elementAfter: JSON.stringify(client.toJSON()),
    });
  } catch (error) {
    logger.error(`${error}`);
  } */

  res.status(201).json(promotionService.toPublic(promotion));
};

const putPromotion = async (req, res, next) => {
  let { promotion } = req;
  if (res.locals && res.locals.promotion) {
    // eslint-disable-next-line prefer-destructuring
    promotion = res.locals.promotion;
  }

  const promotionData = req.body;
  let response;

  try {
    const promotionUuid = promotion.uuid;
    delete promotionData.uuid;
    response = await promotionService.putPromotion(promotionUuid, promotionData);
  } catch (error) {
    if (error instanceof UniqueConstraintError) {
      return next(boom.badData('Ya existe esta promoción'));
    }
    logger.error(`${error}`);
    return next(boom.badData(error.message));
  }

  try {
    await activityService.createActivity({
      action: activityActions.UPDATE_PROMOTION,
      author: req.promotion.name,
      elementBefore: JSON.stringify(promotion.toJSON()),
      elementAfter: JSON.stringify(response.toJSON()),
    });
  } catch (error) {
    logger.error(`${error}`);
  }

  res.json(promotionService.toPublic(response));
};

const deletePromotion = async (req, res, next) => {
  const { promotion } = res.locals;
  const promotionBeforeDelete = cloneDeep(promotion);

  try {
    await promotionService.deleteClient(promotion, req.client._id);
  } catch (error) {
    logger.error(`${error}`);
    return next(boom.badImplementation(error.message));
  }

  try {
    await activityService.createActivity({
      action: activityActions.DELETE_PROMOTION,
      author: req.promotion.toJSON(),
      elementBefore: promotionBeforeDelete.toJSON(),
    });
  } catch (error) {
    logger.error(`${error}`);
  }

  res.status(200).json('La promoción ha sido borrada correctamente');
};

module.exports = {
  listPromotions,
  getPromotion,
  createPromotion,
  putPromotion,
  deletePromotion,
};
