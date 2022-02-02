/* eslint-disable newline-per-chained-call */
const joi = require('joi');
const { validate } = require('express-validation');

const createPromotion = validate(
  {
    body: joi.object({
      // eslint-disable-next-line newline-per-chained-call
      promoImageUrl: joi.string().alphanum().min(3).max(30).required(),
      prizeImageUrl: joi.string().alphanum().min(3).max(30).required(),
      prizeDescription: joi.string().alphanum().min(20).max(500).required(),
      prizeTitle: joi.string().alphanum().min(20).max(500).required(),
      startDate: joi.string().alphanum().min(3).max(30).required(),
      finishDate: joi.string().alphanum().min(3).max(30).required(),
      status: joi.string().alphanum().min(3).max(30).required(),
      pdffUrl: joi.string().alphanum().min(3).max(30).required(),
    }),
  },
  {
    context: false,
    statusCode: 422,
    keyByField: true,
  },
);

module.exports = {
  createPromotion,
};
