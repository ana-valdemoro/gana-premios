/* eslint-disable newline-per-chained-call */
const joi = require('joi');
const { validate } = require('express-validation');

const createPromotion = validate(
  {
    body: joi.object({
      // eslint-disable-next-line newline-per-chained-call
      promotion_image_url: joi.string().required(),
      prize_image_url: joi.string().required(),
      prize_title: joi.string().min(20).max(250).required(),
      prize_description: joi.string().min(20).max(500).required(),
      campaign_uuid: joi.string().uuid(),
      start_date: joi.date().required(),
      end_date: joi.date().greater(joi.ref('start_date')).required(),
      participation_rules_url:  joi.string().required(),
      max_number_participants: joi.number().integer().min(1),
      type: joi.string().required(), 
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
