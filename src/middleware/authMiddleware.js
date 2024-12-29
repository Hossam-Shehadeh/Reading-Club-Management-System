import jwt from 'jsonwebtoken';

export const auth = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) return res.status(401).send('Access denied.');

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send('Invalid token.');
  }
};

export const admin = (req, res, next) => {
  if (req.user.role !== 'admin' && req.user.role !== 'superadmin') {
    return res.status(403).send('Access denied.');
  }
  next();
};

export const superadmin = (req, res, next) => {
  if (req.user.role !== 'superadmin') {
    return res.status(403).send('Access denied.');
  }
  next();
};
