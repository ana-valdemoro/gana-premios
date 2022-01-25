const express = require('express');

const router = express.Router();

const authorization = require('../../../utils/middleware/authorization');
const userController = require('./user.controller');
const middleware = require('./user.middleware');
const validator = require('./user.validator');

// Ver un usuario
// authorization('users:view'),
router.get('/:userUuid', authorization('users:view'), middleware.loadUser, userController.getUser);

// Listar los usuarios paginados
router.get('/', authorization('users:view'), userController.listUsers);

// Crear un usuario
router.post(
  '/',
  authorization('users:create'),
  validator.createUser,
  userController.createMongoUser,
);

// Editar un usuario
router.put(
  '/:userUuid',
  authorization('users:update'),
  validator.putUser,
  middleware.loadUser,
  userController.putUser,
);

// Borrar un usuario
router.delete(
  '/:userUuid',
  authorization('users:delete'),
  validator.deleteUser,
  middleware.loadUser,
  userController.deleteUser,
);

module.exports = router;
