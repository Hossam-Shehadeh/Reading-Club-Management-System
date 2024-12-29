import mongoose from 'mongoose';

const discussionSchema = new mongoose.Schema({
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  dateCommented: { type: Date, default: Date.now }
});

const Discussion = mongoose.model('Discussion', discussionSchema);

export default Discussion;
