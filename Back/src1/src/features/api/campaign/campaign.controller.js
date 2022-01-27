const boom = require('@hapi/boom');
const logger = require('../../../config/winston');
const campaignService = require('./campaign.service');
const userService = require('../user/user.service');

const create = async (req, res, next) => {
  const { name, customerUuid, managerUuid, startDate, endDate } = req.body;
  let manager;
  // Check customer existence
  // Check manager existence
  try {
    manager = await userService.getUser(managerUuid);
  } catch (error) {
    logger.error(`${error}`);
    return next(boom.badData(error.message));
  }
  if (!manager) return next(boom.notFound('No existe el gestor asignado a la campaña'));

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
