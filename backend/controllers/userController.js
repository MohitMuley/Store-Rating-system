const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.getAllUsers = async (req, res) => {
    const filters = req.query;
    const users = await User.getAll(filters);
    res.json(users);
};

exports.getUserById = async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
};

exports.createUser = async (req, res) => {
    const { name, email, password, address, role } = req.body;
    const user = await User.create({ name, email, password, address, role });
    res.status(201).json(user);
};

exports.updatePassword = async (req, res) => {
  try {
    const { id } = req.user; // ✅ get user id from JWT (authMiddleware should set req.user)
    const { newPassword } = req.body;

    if (!newPassword) {
      return res.status(400).json({ message: 'New password is required' });
    }

    const updatedUser = await User.updatePassword(id, newPassword);

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // ✅ remove password before sending response
    const { password: _, ...safeUser } = updatedUser;

    res.status(200).json({ message: 'Password updated successfully', user: safeUser });
  } catch (err) {
    console.error('Update password error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};





