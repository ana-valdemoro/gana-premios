const express = require('express');

const router = express.Router();
const { authorize } = require('../../../utils/middleware/jwt');
const authController = require('./auth.controller');
const userController = require('../user/user.controller');
const userValidator = require('../user/user.validator');

// Activar de usuario
router.post('/activate/:token', userValidator.activateUser, userController.activate);

// Login del usuario
router.post('/login', userValidator.loginUser, authController.login);

// Register user
router.post('/register', userValidator.createUser, authController.register);

// Send email for recovery pass (User)
router.post('/forgot', userValidator.emailRecoveryUser, userController.forgot);

// Restablecer contraseña (User)
router.post('/recovery', userValidator.recoveryUser, userController.recovery);

// Desbloquear cuenta
router.post('/unlock/:token', userValidator.unlockUser, authController.unBlockAccount);

// Subir LOPD
router.post('/lopd', authorize, userValidator.createLopdUser, userController.createLopd);

// Descargar LOPD
router.get('/lopd', authorize, userController.getLopd);

module.exports = router;
