const boom = require('@hapi/boom');
const service = require('./user.service');

async function loadUser(req, res, next) {
  const { userUuid } = req.params;
  let user;

  if (!userUuid) {
    return next(boom.badData(res.__('uuidRequired')));
  }

  try {
    user = await service.getUser(userUuid);
  } catch (error) {
    return next(boom.notFound(res.__('userNotFound')));
  }

  if (!user) return next(boom.notFound(res.__('userNotFound')));
  res.locals.user = user;

  next();
}

module.exports = {
  loadUser,
};
