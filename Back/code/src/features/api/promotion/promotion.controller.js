/* eslint-disable import/no-unresolved */
const boom = require('@hapi/boom');
const logger = require('../../../config/winston');
const promotionFilters = require('./promotion.filters');
const promotionService = require('./promotion.service');
const campaignService = require('../campaign/campaign.service');

const listPromotions = async (req, res, next) => {
  try {
    const filters = promotionFilters(req.query);

    res.json(await promotionService.getPromotions(filters));
  } catch (error) {
    logger.error(`${error}`);
    return next(boom.badImplementation(error.message));
  }
};

const getPromotion = async (req, res, next) => {
  const { promotionUuid } = req.params;

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
  const {
    promotionImageUrl,
    prizeImageUrl,
    prizeTitle,
    prizeDescription,
    campaignUuid,
    startDate,
    endDate,
    participationRulesUrl,
    maxNumberParticipants,
    type,
  } = req.body;

  let campaign;

  try {
    campaign = await campaignService.getCampaign(campaignUuid);

    if (!campaign) {
      return next(boom.badData('La campaña no existe'));
    }
    if (campaign.active === false) {
      return next(boom.badData('La campaña no está activa'));
    }

    if (new Date(campaign.start_date) > new Date(startDate)) {
      return next(
        boom.badData(
          'La fecha de creación de inicio de la promo debe ser mayor que la de la campaña',
        ),
      );
    }
    if (new Date(campaign.end_date) < new Date(endDate)) {
      return next(
        boom.badData('La fecha de finalización de la promo debe ser menor que la de la campaña'),
      );
    }
  } catch (error) {
    logger.error(`${error}`);
    return next(boom.badImplementation(error.message));
  }

  let promotion;

  const promotionData = {
    promotion_image_url: promotionImageUrl,
    prize_image_url: prizeImageUrl,
    prize_title: prizeTitle,
    prize_description: prizeDescription,
    campaign_uuid: campaignUuid,
    start_date: startDate,
    end_date: endDate,
    participation_rules_url: participationRulesUrl,
    max_number_participants: maxNumberParticipants,
    type,
  };

  try {
    promotion = await promotionService.createPromotion(promotionData);
  } catch (error) {
    logger.error(`${error}`);
    return next(boom.badData(error.message));
  }

  res.status(201).json(promotionService.toPublic(promotion));
};

const updatePromotion = async (req, res, next) => {
  const {
    promotionImageUrl,
    prizeImageUrl,
    prizeTitle,
    prizeDescription,
    campaignUuid,
    startDate,
    endDate,
    participationRulesUrl,
    maxNumberParticipants,
    type,
  } = req.body;

  let response;
  let promotion;

  if (res.locals && res.locals.promotion) {
    promotion = res.locals.promotion;
  }

  const promotionData = {
    promotion_image_url: promotionImageUrl,
    prize_image_url: prizeImageUrl,
    prize_title: prizeTitle,
    prize_description: prizeDescription,
    campaign_uuid: campaignUuid,
    start_date: startDate,
    end_date: endDate,
    participation_rules_url: participationRulesUrl,
    max_number_participants: maxNumberParticipants,
    type,
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

  res.status(200).json({});
};

module.exports = {
  listPromotions,
  getPromotion,
  createPromotion,
  updatePromotion,
  deletePromotion,
};
