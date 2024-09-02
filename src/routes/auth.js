const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const logger = require('../config');
require('dotenv').config();

// Register a new user
router.post('/register', async (req, res) => {
  try {
    console.log("register",req.body)
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    logger.error(`Error registering user: ${err.message}`);
    res.status(400).json({ message: err.message });
  }
});

// Login and get a token
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log(email,password);
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const accessToken = jwt.sign(
      { _id: user._id, role: user.role },
      "test123",
      { expiresIn: '1h' }
    );
    res.status(200).json({ accessToken });
  } catch (err) {
    logger.error(`Error login user: ${err.message}`);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
