const joi = require('joi');
const { validate } = require('express-validation');

const createCampaign = validate(
  {
    body: joi.object({
      // eslint-disable-next-line newline-per-chained-call
      name: joi.string().min(20).max(250).required(),
      client_uuid: joi.string().uuid().required(),
      start_date: joi.date().required(),
      end_date: joi.date().greater(joi.ref('start_date')).required(),
    }),
  },
  {
    context: false,
    statusCode: 422,
    keyByField: true,
  },
);

const putCampaign = validate(
  {
    body: joi.object({
      // eslint-disable-next-line newline-per-chained-call
      name: joi.string().min(20).max(250).required(),
      client_uuid: joi.string().uuid().required(),
      start_date: joi.date().required(),
      end_date: joi.date().greater(joi.ref('start_date')).required(),
    }),
  },
  {
    context: false,
    statusCode: 422,
    keyByField: true,
  },
);

module.exports = {
  createCampaign,
  putCampaign,
};
