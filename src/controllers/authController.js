import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { validateRegister, validateLogin } from '../utils/validation.js';

export const register = async (req, res) => {
  const { error } = validateRegister(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already exists.');

  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });
  
  // if(role){
  //   user.role = role
  // }

  await user.save();
  const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET);
  res.header('auth-token', token).send(token);
};

export const login = async (req, res) => {
  const { error } = validateLogin(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Invalid email or password.');

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid email or password.');

  const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET);
  res.header('auth-token', token).send(token);
};
