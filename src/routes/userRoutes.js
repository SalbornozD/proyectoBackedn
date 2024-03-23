// userRoutes.js
const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('../passport'); // Asegúrate de que la ruta sea correcta
const userModel = require('../users.models');
const bcrypt = require('bcrypt');

const router = express.Router();

// Agregar rutas de login y current aquí

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).send({ message: 'Login failed' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({ message: 'Login failed' });
        }
        const token = jwt.sign({ sub: user.id }, 'your_secret_key', { expiresIn: '1h' });
        res.cookie('jwt', token, { httpOnly: true, secure: true });
        res.status(200).send({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).send({ message: 'Internal server error' });
    }
});

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.send(req.user);
});

module.exports = router;