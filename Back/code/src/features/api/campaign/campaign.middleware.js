const boom = require('@hapi/boom');
const service = require('./campaign.service');

async function loadCampaign(req, res, next) {
  const { campaignUuid } = req.params;
  let campaign;

  if (!campaignUuid) {
    return next(boom.badData('El identificador de campaña es obligatorio'));
  }

  try {
    campaign = await service.getCampaign(campaignUuid);
  } catch (error) {
    return next(boom.notFound('Campaña no encontrado'));
  }

  if (!campaign) return next(boom.notFound('Campaña no encontrado'));
  res.locals.campaign = campaign;

  next();
}

module.exports = {
  loadCampaign,
};
