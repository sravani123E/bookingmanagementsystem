import { Request, Response, NextFunction } from 'express';
import { bookService } from '../services/bookService';
import { HttpError } from '../middleware/errorHandler';
import { CreateBookDto } from '../types/book';

export const getAllBooks = (req: Request, res: Response) => {
  const books = bookService.getAllBooks();
  res.json(books);
};

export const getBookById = (req: Request, res: Response, next: NextFunction) => {
  const book = bookService.getBookById(req.params.id);
  if (!book) {
    return next(new HttpError(404, 'Book not found'));
  }
  res.json(book);
};

export const createBook = (req: Request, res: Response, next: NextFunction) => {
  try {
    const bookData: CreateBookDto = req.body;
    if (!bookData.title || !bookData.author || !bookData.publishedYear) {
      return next(new HttpError(400, 'Missing required fields'));
    }
    const newBook = bookService.createBook(bookData);
    res.status(201).json(newBook);
  } catch (error) {
    next(error);
  }
};

export const updateBook = (req: Request, res: Response, next: NextFunction) => {
  try {
    const bookData: CreateBookDto = req.body;
    if (!bookData.title || !bookData.author || !bookData.publishedYear) {
      return next(new HttpError(400, 'Missing required fields'));
    }
    const updatedBook = bookService.updateBook(req.params.id, bookData);
    if (!updatedBook) {
      return next(new HttpError(404, 'Book not found'));
    }
    res.json(updatedBook);
  } catch (error) {
    next(error);
  }
};

export const deleteBook = (req: Request, res: Response, next: NextFunction) => {
  const deleted = bookService.deleteBook(req.params.id);
  if (!deleted) {
    return next(new HttpError(404, 'Book not found'));
  }
  res.json({ message: 'Book deleted successfully' });
};

export const importBooks = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) {
      return next(new HttpError(400, 'No CSV file uploaded'));
    }

    const csvContent = req.file.buffer.toString('utf-8');
    const result = bookService.importBooksFromCSV(csvContent);
    res.json(result);
  } catch (error) {
    next(error);
  }
};