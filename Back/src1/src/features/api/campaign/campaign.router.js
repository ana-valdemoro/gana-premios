const express = require('express');

const router = express.Router();
const authorization = require('../../../utils/middleware/authorization');
const campaignController = require('./campaign.controller');
// const middleware = require('./user.middleware');
const validator = require('./campaign.validator');

// Crear una campaña
router.post(
  '/',
  authorization('campaigns:create'),
  validator.createCampaign,
  campaignController.create,
);

module.exports = router;
