const boom = require('@hapi/boom');
const service = require('./promotion.service');

async function loadPromotion(req, res, next) {
  const { promotionUuid } = req.params;
  let promotion;

  if (!promotionUuid) {
    return next(boom.badData('El identificador es obligatorio'));
  }

  try {
    promotion = await service.getPromotion(promotionUuid);
  } catch (error) {
    return next(boom.notFound('Promoción no encontrada'));
  }

  if (!promotion) return next(boom.notFound('Promoción no encontrada'));
  res.locals.promotion = promotion;

  next();
}

module.exports = {
  loadPromotion,
};
