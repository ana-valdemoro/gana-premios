const express = require('express');

const router = express.Router();

const authController = require('./auth.controller');
const userController = require('../user/user.controller');
const userValidator = require('../user/user.validator');

// Activar de usuario
router.post('/activate/:token', userValidator.activateUser, authController.activateAccount);

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

module.exports = router;
