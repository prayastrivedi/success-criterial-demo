const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { authenticateToken, authorizeRole } = require('../middleware/auth');
const logger = require('../config');

// Create a new user (accessible to admins)
router.post('/', authenticateToken, authorizeRole('admin'), async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    logger.error(`Error creating user: ${err.message}`);
    res.status(400).json({ message: err.message });
  }
});

// Read all users (accessible to admins)
router.get('/', authenticateToken, authorizeRole('admin'), async (req, res) => {
  try {
    console.log("came to get ")
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    logger.error(`Error finding user: ${err.message}`);
    res.status(500).json({ message: err.message });
  }
});

// Read a user by ID (accessible to the user themselves or admins)
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (req.user.role === 'admin' || req.user._id.toString() === req.params.id) {
      res.status(200).json(user);
    } else {
      res.sendStatus(403);
    }
  } catch (err) {
    logger.error(`Error getting user: ${err.message}`);
    res.status(500).json({ message: err.message });
  }
});

// Update a user by ID (accessible to the user themselves or admins)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (req.user.role === 'admin' || req.user._id.toString() === req.params.id) {
      Object.assign(user, req.body);
      await user.save();
      res.status(200).json(user);
    } else {
      res.sendStatus(403);
    }
  } catch (err) {
    logger.error(`Error updating user: ${err.message}`);
    res.status(400).json({ message: err.message });
  }
});

// Delete a user by ID (accessible to admins)
router.delete('/:id', authenticateToken, authorizeRole('admin'), async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted' });
  } catch (err) {
    logger.error(`Error deleting user: ${err.message}`);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
