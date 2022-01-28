const boom = require('@hapi/boom');
const logger = require('../../../config/winston');
const campaignFilters = require('./campaign.filters');
const campaignService = require('./campaign.service');

const create = async (req, res, next) => {
  const managerUuid = req.user.uuid;
  const { name, customerUuid, startDate, endDate } = req.body;
  // Check customer existence

  let campaign;
  const campaignData = {
    name,
    customer_uuid: customerUuid,
    manager_uuid: managerUuid,
    start_date: startDate,
    end_date: endDate,
  };
  try {
    campaign = await campaignService.createCampaign(campaignData);
  } catch (error) {
    logger.error(`${error}`);
    return next(boom.badData(error.message));
  }

  res.status(201).json(campaignService.toPublic(campaign));
};

const listCampaings = async (req, res, next) => {
  try {
    const filters = campaignFilters(req.query, req.user.uuid);

    return res.json(await campaignService.getCampaigns(filters));
  } catch (error) {
    logger.error(`${error}`);
    return next(boom.badImplementation(error.message));
  }
};

module.exports = {
  create,
  listCampaings,
};
