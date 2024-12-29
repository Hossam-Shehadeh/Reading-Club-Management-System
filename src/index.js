import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import meetingRoutes from './routes/meetingRoutes.js';
import discussionRoutes from './routes/discussionRoutes.js';
import { auth, admin, superadmin } from './middleware/authMiddleware.js';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  return res.json({ 'message': 'Welcome to the Reading Club system' });
});
app.use('/api/auth', authRoutes);
app.use('/api/users', auth, userRoutes);
app.use('/api/books', auth, bookRoutes);
app.use('/api/meetings', auth, meetingRoutes);
app.use('/api/discussions', auth, discussionRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
