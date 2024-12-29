import express from 'express';
import { getBooks, getBook, addBook, updateBook, deleteBook } from '../controllers/bookController.js';
import { verifyToken, isAdmin } from '../utils/jwt.js';

const router = express.Router();

router.get('/', verifyToken, getBooks);
router.get('/:id', verifyToken, getBook);
router.post('/', verifyToken, isAdmin, addBook);
router.put('/:id', verifyToken, isAdmin, updateBook);
router.delete('/:id', verifyToken, isAdmin, deleteBook);

export default router;
