import Meeting from '../models/Meeting.js';
import { validateMeeting } from '../utils/validation.js';

export const getMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find().populate('book');
    res.send(meetings);
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

export const getMeeting = async (req, res) => {
  try {
    const meeting = await Meeting.findById(req.params.id).populate('book');
    if (!meeting) return res.status(404).send('Meeting not found');
    res.send(meeting);
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

export const addMeeting = async (req, res) => {
  const { error } = validateMeeting(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const meeting = new Meeting(req.body);

  try {
    await meeting.save();
    res.send(meeting);
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

export const updateMeeting = async (req, res) => {
  const { error } = validateMeeting(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const meeting = await Meeting.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    ).populate('book');
    if (!meeting) return res.status(404).send('Meeting not found');
    res.send(meeting);
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

export const deleteMeeting = async (req, res) => {
  try {
    const meeting = await Meeting.findByIdAndDelete(req.params.id).populate('book');
    if (!meeting) return res.status(404).send('Meeting not found');
    res.send('Meeting deleted');
  } catch (error) {
    res.status(500).send('Server Error');
  }
};
