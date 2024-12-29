import mongoose from 'mongoose';

const meetingSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true },
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true }
});

const Meeting = mongoose.model('Meeting', meetingSchema);

export default Meeting;
