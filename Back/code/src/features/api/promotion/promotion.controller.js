/* eslint-disable import/no-unresolved */
const boom = require('@hapi/boom');

const { UniqueConstraintError } = require('sequelize');

const promotionService = require('./promotion.service');

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
    const promotion = await promotionService.getPromotion(promotionUuid);
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
    promotion = await promotionService.createPromotion(promotionData);
  } catch (error) {
    if (error instanceof UniqueConstraintError) {
      return next(boom.badData('Ya existe esta promoción'));
    }
    logger.error(`${error}`);
    return next(boom.badData(error.message));
  }
  res.status(201).json(promotionService.toPublic(promotion));
};

const updatePromotion = async (req, res, next) => {
  let response;
  let promotion;

  if (res.locals && res.locals.promotion) {
    promotion = res.locals.promotion;
  }

  const promotionData = {
    ...req.body,
    uuid: promotion.uuid,
    active: promotion.active,
    deleted: promotion.deleted,
    status: promotion.status,
    promotion_history_uuid: promotion.promotion_history_uuid,
    uuid_participants: promotion.uuid_participants,
    additional_information: promotion.additional_information,
  };

  try {
    response = await promotionService.putPromotion(promotion.uuid, promotionData);
  } catch (error) {
    logger.error(`${error}`);
    return next(boom.badData(error.message));
  }

  return res.json(promotionService.toPublic(response));
};

const deletePromotion = async (req, res, next) => {
  const { promotion } = res.locals;

  try {
    await promotionService.deletePromotion(promotion);
  } catch (error) {
    logger.error(`${error}`);
    return next(boom.badImplementation(error.message));
  }

  res.status(200).json('La promoción ha sido borrada correctamente');
};

module.exports = {
  listPromotions,
  getPromotion,
  createPromotion,
  updatePromotion,
  deletePromotion,
};
