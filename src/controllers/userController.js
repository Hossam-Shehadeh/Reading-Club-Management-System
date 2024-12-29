import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validateUser } from '../utils/validation.js';

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.send(users);
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).send('User not found');
    res.send(user);
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

export const updateUser = async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    ).select('-password');
    if (!user) return res.status(404).send('User not found');
    res.send(user);
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id).select('-password');
    if (!user) return res.status(404).send('User not found');
    res.send('User deleted');
  } catch (error) {
    res.status(500).send('Server Error');
  }
};
