/* eslint-disable import/no-unresolved */
// eslint-disable-next-line no-unused-vars
const { v4: uuidv4 } = require('uuid');
const { Promotion } = require('../../../models/index');

const DRAFT = 0;
const PUBLISHED = 1;
const FINISHED = 2;
const DESERTED = 3;

const toPublic = (promotion) => promotion.toJSON();

const getPromotions = async (filters, options) =>
  Promotion.find({ where: filters, promotion: options.promotion });

const getPromotion = async (uuid) => Promotion.findOne({ uuid });

const createPromotion = async (data) => {
  const dataToCreate = { ...data, uuid: uuidv4() };
  return Promotion.create(dataToCreate);
};

const putPromotion = async (uuid, data) => Promotion.findOneAndUpdate(uuid, data, { new: true });

const deletePromotion = async (promotion) => promotion.remove();

module.exports = {
  toPublic,
  getPromotions,
  getPromotion,
  createPromotion,
  putPromotion,
  deletePromotion,
  DRAFT,
  PUBLISHED,
  FINISHED,
  DESERTED,
};
