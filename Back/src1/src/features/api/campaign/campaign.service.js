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

const getCampaigns = (filters) => Campaign.find({ ...filters });

const getCampaign = (uuid) => Campaign.findOne({ uuid });

module.exports = {
  toPublic,
  createCampaign,
  getCampaigns,
  getCampaign,
};
