const { v4: uuidv4 } = require('uuid');
const { Campaign } = require('../../../models/index');

const toPublic = (campaign) => campaign.toJSON();

const createCampaign = async (data) => {
  const dataToCreate = {
    ...data,
    uuid: uuidv4(),
  };
  return Campaign.create(dataToCreate);
};

module.exports = {
  toPublic,
  createCampaign,
};
