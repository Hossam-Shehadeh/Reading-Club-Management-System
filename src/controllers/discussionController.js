import Discussion from '../models/Discussion.js';
import { validateDiscussion } from '../utils/validation.js';

export const getDiscussions = async (req, res) => {
  try {
    const discussions = await Discussion.find().populate('book user');
    res.send(discussions);
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

export const getDiscussionsForBook = async (req, res) => {
  try {
    const discussions = await Discussion.find({ book: req.params.bookId }).populate('user');
    if (!discussions) return res.status(404).send('No discussions found for this book');
    res.send(discussions);
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

export const addDiscussion = async (req, res) => {
  const { error } = validateDiscussion(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const discussion = new Discussion({
    book: req.body.book,
    user: req.user._id,
    text: req.body.text
  });

  try {
    await discussion.save();
    res.send(discussion);
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

export const deleteDiscussion = async (req, res) => {
  try {
    const discussion = await Discussion.findByIdAndDelete(req.params.id).populate('user');
    if (!discussion) return res.status(404).send('Discussion not found');
    res.send('Discussion deleted');
  } catch (error) {
    res.status(500).send('Server Error');
  }
};
