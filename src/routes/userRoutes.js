const express = require('express');
const userController = require('../controllers/userControllers');
const passport = require('passport');
const router = express.Router();

// Registro de usuarios
router.post('/register', userController.registerUser);

// Login de usuarios
router.post('/login', userController.loginUser);

// Obtener datos del usuario actual
router.get('/current', passport.authenticate('jwt', { session: false }), userController.getCurrentUser);

module.exports = router;
