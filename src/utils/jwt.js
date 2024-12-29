import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) return res.status(401).send('Access Denied');

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user.role != 'admin' && req.user.role != 'superadmin') {
    return res.status(403).send('Access Denied');
  }
  next();
};

export const isSuperAdmin = (req, res, next) => {
  if (req.user.role !== 'superadmin') {
    return res.status(403).send('Access Denied');
  }
  next();
};
