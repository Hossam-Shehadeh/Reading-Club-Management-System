import express from 'express';
import { getMeetings, getMeeting, addMeeting, updateMeeting, deleteMeeting } from '../controllers/meetingController.js';
import { verifyToken, isAdmin } from '../utils/jwt.js';

const router = express.Router();

router.get('/', verifyToken, getMeetings);
router.get('/:id', verifyToken, getMeeting);
router.post('/', verifyToken, isAdmin, addMeeting);
router.put('/:id', verifyToken, isAdmin, updateMeeting);
router.delete('/:id', verifyToken, isAdmin, deleteMeeting);

export default router;
