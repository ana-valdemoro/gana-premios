const boom = require('@hapi/boom');
const service = require('./promotion.service');
const campaignService = require('../campaign/campaign.service');
const { MANAGER_RESOURCES } = require('../user/user.service');

async function loadPromotion(req, res, next) {
  const { promotionUuid } = req.params;
  let promotion;

  if (!promotionUuid) {
    return next(boom.badData(res.__('uuidRequired')));
  }

  try {
    promotion = await service.getPromotion(promotionUuid);
  } catch (error) {
    return next(boom.badImplementation(error.message));
  }

  if (!promotion) return next(boom.notFound(res.__('promotionNotFound')));
  res.locals.promotion = promotion;

  next();
}

async function checkCampaignRequirements(req, res, next) {
  const { campaignUuid, startDate, endDate } = req.body;
  const { user } = req;
  let campaign;

  try {
    campaign = await campaignService.getCampaign(campaignUuid);
  } catch (error) {
    return next(boom.badImplementation(error.message));
  }

  if (!campaign) {
    return next(boom.badData(res.__('campaignNonExist')));
  }

  if (user.priority === MANAGER_RESOURCES && user.uuid !== campaign.manager_uuid) {
    return next(boom.badData(res.__('noCreatePromotions')));
  }

  if (campaign.active === false) {
    return next(boom.badData(res.__('campaignNotActive')));
  }

  if (new Date(startDate) < new Date(campaign.start_date)) {
    return next(boom.badData(res.__('startDatePromotion')));
  }

  if (new Date(endDate) > new Date(campaign.end_date)) {
    return next(boom.badData(res.__('endDatePromotion')));
  }

  next();
}

module.exports = {
  loadPromotion,
  checkCampaignRequirements,
};
