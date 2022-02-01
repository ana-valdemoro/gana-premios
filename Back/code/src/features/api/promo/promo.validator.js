const joi = require('joi');
const { validate } = require('express-validation');

const createPromo = validate(
  {
    body: joi.object({
      // eslint-disable-next-line newline-per-chained-call
      uuid: joi.string().alphanum().min(3).max(30).required(),
      promoImageUrl: joi.string().alphanum().min(3).max(30).required(),
      prizeImageUrl: joi.string().alphanum().min(3).max(30).required(),
      prizeDescription: joi.string().alphanum().min(20).max(500).required(),
      prizeTitle:joi.string().alphanum().min(20).max(500).required(),
      uuidCampaign:joi.string().alphanum().min(3).max(30).required(),
    startDate:joi.string().alphanum().min(3).max(30).required(),
    finishDate:joi.string().alphanum().min(3).max(30).required(),
    active:joi.string().alphanum().min(3).max(30).required(),
    status:joi.string().alphanum().min(3).max(30).required(),
    pdffUrl:joi.string().alphanum().min(3).max(30).required(),
    sorteo:joi.string().alphanum().min(3).max(30).required(),


    }),
  },
  {
    context: false,
    statusCode: 422,
    keyByField: true,
  },
);

const putUser = validate(
  {
    body: joi.object({
      // eslint-disable-next-line newline-per-chained-call
      name: joi.string().alphanum().min(3).max(30),
      email: joi.string().email(),
      password: joi.string(),
    }),
  },
  {
    context: false,
    statusCode: 422,
    keyByField: true,
  },
);

const deleteUser = validate(
  {
    body: joi.object({}),
  },
  {
    context: false,
    statusCode: 422,
    keyByField: true,
  },
);

const activateUser = validate(
  {
    body: joi.object({}),
  },
  {
    context: false,
    statusCode: 422,
    keyByField: true,
  },
);

const loginUser = validate(
  {
    body: joi.object({
      email: joi.string().email().required(),
      password: joi.string().required(),
    }),
  },
  {
    context: false,
    statusCode: 422,
    keyByField: true,
  },
);

const emailRecoveryUser = validate(
  {
    body: joi.object({
      email: joi.string().email().required(),
    }),
  },
  {
    context: false,
    statusCode: 422,
    keyByField: true,
  },
);

const recoveryUser = validate(
  {
    body: joi.object({
      token: joi.string().required(),
      password: joi.string().required(),
    }),
  },
  {
    context: false,
    statusCode: 422,
    keyByField: true,
  },
);

module.exports = {
  createPromo,
  
};
