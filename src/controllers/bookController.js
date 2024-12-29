import Book from '../models/Book.js';
import { validateBook } from '../utils/validation.js';

export const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.send(books);
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

export const getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).send('Book not found');
    res.send(book);
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

export const addBook = async (req, res) => {
  const { error } = validateBook(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const book = new Book(req.body);

  try {
    await book.save();
    res.send(book);
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

export const updateBook = async (req, res) => {
  const { error } = validateBook(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!book) return res.status(404).send('Book not found');
    res.send(book);
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).send('Book not found');
    res.send('Book deleted');
  } catch (error) {
    res.status(500).send('Server Error');
  }
};
