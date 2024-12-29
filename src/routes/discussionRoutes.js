import express from 'express';
import { getDiscussions, getDiscussionsForBook, addDiscussion, deleteDiscussion } from '../controllers/discussionController.js';
import { verifyToken } from '../utils/jwt.js';

const router = express.Router();

router.get('/', verifyToken, getDiscussions);
router.get('/book/:bookId', verifyToken, getDiscussionsForBook);
router.post('/', verifyToken, addDiscussion);
router.delete('/:id', verifyToken, deleteDiscussion);

export default router;
