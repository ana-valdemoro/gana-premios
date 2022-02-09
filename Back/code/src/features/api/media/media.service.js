const { Media } = require('../../../models/index');

const toPublic = (campaign) => campaign.toJSON();

const createMedia = async (data) => {
  const dataToCreate = {
    ...data,
  };
  return Media.create(dataToCreate);
};

const getMedia = async (uuid) => Media.findOne({ uuid });

module.exports = {
  toPublic,
  createMedia,
  getMedia,
};
