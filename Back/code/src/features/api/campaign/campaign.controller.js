const boom = require('@hapi/boom');
const logger = require('../../../config/winston');
const campaignFilters = require('./campaign.filters');
const campaignService = require('./campaign.service');
const clientService = require('../client/client.service');

const create = async (req, res, next) => {
  const managerUuid = req.user.uuid;
  const { name, clientUuid, startDate, endDate } = req.body;
  let client;

  try {
    client = await clientService.getClient(clientUuid);

    if(!client){
      return next(boom.badData('El cliente no existe'));
    }
  } catch (error) {
    logger.error(`${error}`);
    return next(boom.badImplementation(error.message));
  }

  let campaign;
  const campaignData = {
    name,
    client_uuid: clientUuid,
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

const getCampaing = async (req, res, next) => {
  try {
    if (res.locals && res.locals.campaign) {
      return res.json(await campaignService.toPublic(res.locals.campaign));
    }
  } catch (error) {
    logger.error(`${error}`);
    return next(boom.badImplementation(error.message));
  }
};

module.exports = {
  create,
  listCampaings,
  getCampaing,
};
