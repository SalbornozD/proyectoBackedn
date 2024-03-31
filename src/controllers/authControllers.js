const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userModel = require('../dao/models/usersModel');
const { jwtSecret } = require('../config');

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).send({ message: 'Login failed: user not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({ message: 'Login failed: incorrect password' });
        }

        const token = jwt.sign({ sub: user.id }, jwtSecret, { expiresIn: '1h' });
        res.cookie('jwt', token, { httpOnly: true, secure: true });
        res.status(200).send({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).send({ message: 'Internal server error' });
    }
};

exports.getCurrentUser = (req, res) => {
    res.send(req.user);
};
