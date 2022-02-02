const joi = require('joi');
const { validate } = require('express-validation');

const createClient = validate(
  {
    body: joi.object({
      // eslint-disable-next-line newline-per-chained-call
      name: joi.string().alphanum().min(3).max(30).required(),
      // eslint-disable-next-line newline-per-chained-call
      responsable: joi.string().email().required(),
      // eslint-disable-next-line newline-per-chained-call
      campaign: joi.string().min(3).max(30).required(),
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
      name: joi.string().alphanum().min(3).max(30),
      responsable: joi.string().email().required(),
      campaign: joi.string().min(3).max(30).required(),
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

const activateClient = validate(
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
  activateClient,
};
