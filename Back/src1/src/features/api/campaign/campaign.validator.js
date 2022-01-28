const joi = require('joi');
const { validate } = require('express-validation');

const createCampaign = validate(
  {
    body: joi.object({
      // eslint-disable-next-line newline-per-chained-call
      name: joi.string().min(20).max(250).required(),
      customerUuid: joi.string().uuid().required(),
      startDate: joi.date().required(),
      endDate: joi.date().greater(joi.ref('startDate')).required(),
    }),
  },
  {
    context: false,
    statusCode: 422,
    keyByField: true,
  },
);
      startDate: joi.date().required(),
      endDate: joi.date().greater(joi.ref('startDate')).required(),
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
};
