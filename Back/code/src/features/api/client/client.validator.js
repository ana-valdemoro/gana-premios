const joi = require('joi');
const { validate } = require('express-validation');

const createClient = validate(
  {
    body: joi.object({
      // eslint-disable-next-line newline-per-chained-call
      name: joi.string().min(20).max(100).required(),
      // eslint-disable-next-line newline-per-chained-call
      responsable: joi.string().min(20).max(250).required(),
      // eslint-disable-next-line newline-per-chained-call
      numberPromotionActive: joi.number().min(1).max(10).required(),
    }),
  },
  {
    context: false,
    statusCode: 422,
    keyByField: true,
  },
);

const putClient = validate(
  {
    body: joi.object({
      // eslint-disable-next-line newline-per-chained-call
      name: joi.string().min(20).max(100),
      responsable: joi.string().min(20).max(250),
      numberPromotionActive: joi.number().min(1).max(10),
    }),
  },
  {
    context: false,
    statusCode: 422,
    keyByField: true,
  },
);

const deleteClient = validate(
  {
    body: joi.object({}),
  },
  {
    context: false,
    statusCode: 422,
    keyByField: true,
  },
);

module.exports = {
  createClient,
  putClient,
  deleteClient,
};
