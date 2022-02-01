const express = require('express');

const router = express.Router();
const promotionController = require('./promotion.controller');
const authorization = require('../../../utils/middleware/authorization');
const validator = require('./promotion.validator');

// Crear una promoción
router.post(
  '/',
  authorization('promotions:create'),
  validator.createPromotion,
  promotionController.createPromotion,
);

module.exports = router;
