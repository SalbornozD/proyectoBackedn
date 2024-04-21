const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../dao/models/userModel');

exports.registerUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      ...req.body,
      password: hashedPassword
    });
    await newUser.save();
    res.status(201).send({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(401).send({ message: 'Authentication failed' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.send({ message: 'Logged in successfully', token });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.getCurrentUser = (req, res) => {
  res.send(req.user);
};
