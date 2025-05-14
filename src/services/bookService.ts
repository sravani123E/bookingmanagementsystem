import { v4 as uuidv4 } from 'uuid';
import { Book, CreateBookDto, ImportResult } from '../types/book';

class BookService {
  private books: Book[] = [];

  getAllBooks(): Book[] {
    return this.books;
  }

  getBookById(id: string): Book | undefined {
    return this.books.find(book => book.id === id);
  }

  createBook(bookData: CreateBookDto): Book {
    const newBook: Book = {
      id: uuidv4(),
      ...bookData
    };
    this.books.push(newBook);
    return newBook;
  }

  updateBook(id: string, bookData: CreateBookDto): Book | undefined {
    const bookIndex = this.books.findIndex(book => book.id === id);
    if (bookIndex === -1) return undefined;

    const updatedBook: Book = {
      id,
      ...bookData
    };
    this.books[bookIndex] = updatedBook;
    return updatedBook;
  }

  deleteBook(id: string): boolean {
    const initialLength = this.books.length;
    this.books = this.books.filter(book => book.id !== id);
    return this.books.length !== initialLength;
  }

  importBooksFromCSV(csvContent: string): ImportResult {
    const lines = csvContent.split('\n');
    const headers = lines[0].split(',');
    const result: ImportResult = {
      addedCount: 0,
      errors: []
    };

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const values = line.split(',');
      const rowErrors: string[] = [];

      // Validate row data
      if (values.length !== headers.length) {
        rowErrors.push('Invalid number of columns');
      } else {
        const [title, author, publishedYearStr] = values;
        const publishedYear = parseInt(publishedYearStr);

        if (!title?.trim()) rowErrors.push('Title is required');
        if (!author?.trim()) rowErrors.push('Author is required');
        if (isNaN(publishedYear) || publishedYear < 1000 || publishedYear > new Date().getFullYear()) {
          rowErrors.push('Invalid published year');
        }

        if (rowErrors.length === 0) {
          this.createBook({
            title: title.trim(),
            author: author.trim(),
            publishedYear
          });
          result.addedCount++;
        }
      }

      if (rowErrors.length > 0) {
        result.errors.push({
          row: i,
          errors: rowErrors
        });
      }
    }

    return result;
  }
}

export const bookService = new BookService();