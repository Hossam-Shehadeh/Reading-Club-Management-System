import express from 'express';
import { getUsers, getUser, updateUser, deleteUser } from '../controllers/userController.js';
import { verifyToken, isAdmin, isSuperAdmin } from '../utils/jwt.js';

const router = express.Router();

router.get('/', verifyToken, isAdmin, getUsers);
router.get('/:id', verifyToken, isAdmin, getUser);
router.put('/:id', verifyToken, isSuperAdmin, updateUser);
router.delete('/:id', verifyToken, isSuperAdmin, deleteUser);

export default router;
