const express = require('express');

const router = express.Router();
const promotionController = require('./promotion.controller');
const authorization = require('../../../utils/middleware/authorization');
const middleware = require('./promotion.middleware');
const validator = require('./promotion.validator');

// Crear una promoción
router.post(
  '/',
  authorization('promotions:create'),
  validator.createPromotion,
  promotionController.createPromotion,
);

// Listar las promociones paginadas
router.get('/', authorization('promotions:view'), promotionController.listPromotions);

// Editar una promoción
router.put(
  '/:promotionUuid',
  authorization('promotions:update'),
  // validator.putPromotion,
  middleware.loadPromotion,
  promotionController.putPromotion,
);

// Borrar una promoción
router.delete(
  '/:promotionUuid',
  authorization('promotions:delete'),
  // validator.deletePromotion,
  middleware.loadPromotion,
  promotionController.deletePromotion,
);

module.exports = router;
