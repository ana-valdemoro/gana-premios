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
  let campaings;
  const filters = campaignFilters(req.query, req.user.uuid);
  const listCampaigns = [];

  try {
    campaings = await campaignService.getCampaigns(filters);
  } catch (error) {
    logger.error(`${error}`);
    return next(boom.badImplementation(error.message));
  }
  
  for (const campaign of campaings) {
    try {
      let client = await clientService.getClient(campaign.client_uuid);
      console.log(client);
      if(!client){
        logger.error(`El cliente no existe`);
      }else{
        let campaignPublic = await campaignService.toPublic(campaign);
        listCampaigns.push({ ...campaignPublic,client})
      }

    } catch (error) {
      logger.error(`${error}`);
      return next(boom.badImplementation(error.message));
    }

  }


  return res.json(listCampaigns);
};

const getCampaing = async (req, res, next) => {
  let { campaign } = res.locals;

  try {
    client = await clientService.getClient(campaign.client_uuid);

    if(!client){
      return next(boom.badData('El cliente no existe'));
    }

    newCampaign = {
      ...campaign,
      client
    }
  } catch (error) {
    logger.error(`${error}`);
    return next(boom.badImplementation(error.message));
  }

  try {
    return res.json(newCampaign);
  } catch (error) {
    logger.error(`${error}`);
    return next(boom.badImplementation(error.message));
  }
};

const updateCampaign = async (req, res, next) => {
  let { campaign } = res.locals;

  const campaignData = { 
    ...req.body, 
    uuid: campaign.uuid,
    manager_uuid: campaign.manager_uuid,
    active: campaign.active,
    deleted: campaign.deleted,
   };
  let response;

  try {
    response = await campaignService.putCampaign(campaign.uuid, campaignData);
  } catch (error) {
    logger.error(`${error}`);
    return next(boom.badData(error.message));
  }

  return res.json(campaignService.toPublic(response));
};

module.exports = {
  create,
  listCampaings,
  getCampaing,
  updateCampaign,
};
