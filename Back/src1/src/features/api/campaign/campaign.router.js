const express = require('express');

const router = express.Router();
const authorization = require('../../../utils/middleware/authorization');
const campaignController = require('./campaign.controller');
const validator = require('./campaign.validator');

// Listar campañas del gestor
router.get('/', authorization('campaigns:view'), campaignController.listCampaings);

// Crear una campaña
router.post(
  '/',
  authorization('campaigns:create'),
  validator.createCampaign,
  campaignController.create,
);

module.exports = router;
