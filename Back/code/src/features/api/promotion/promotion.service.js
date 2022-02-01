const { v4: uuidv4 } = require('uuid');
const { Promotion } = require('../../../models/index');

const DRAFT = 0;
const PUBLISHED = 1;
const FINISHED = 2;
const DESERTED = 3;

const toPublic = (promotion) => promotion.toJSON();

const createPromotion = async (data) => {
  const dataToCreate = {
    ...data,
    uuid: uuidv4(),
  };
  return Promotion.create(dataToCreate);
};

module.exports = {
  toPublic,
  createPromotion,
  DRAFT,
  PUBLISHED,
  FINISHED,
  DESERTED,
};
