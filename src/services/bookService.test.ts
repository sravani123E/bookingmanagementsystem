import { bookService } from './bookService';

describe('BookService', () => {
  beforeEach(() => {
    // Reset the books array before each test
    const service = bookService as any;
    service.books = [];
  });

  describe('createBook', () => {
    it('should create a new book with valid data', () => {
      const bookData = {
        title: 'Test Book',
        author: 'Test Author',
        publishedYear: 2023
      };

      const newBook = bookService.createBook(bookData);

      expect(newBook).toHaveProperty('id');
      expect(newBook.title).toBe(bookData.title);
      expect(newBook.author).toBe(bookData.author);
      expect(newBook.publishedYear).toBe(bookData.publishedYear);
    });
  });

  describe('importBooksFromCSV', () => {
    it('should successfully import valid CSV data', () => {
      const csvContent = 'title,author,publishedYear\nBook 1,Author 1,2020\nBook 2,Author 2,2021';
      
      const result = bookService.importBooksFromCSV(csvContent);

      expect(result.addedCount).toBe(2);
      expect(result.errors).toHaveLength(0);
    });

    it('should handle invalid CSV data', () => {
      const csvContent = 'title,author,publishedYear\nBook 1,,2020\nBook 2,Author 2,invalid';
      
      const result = bookService.importBooksFromCSV(csvContent);

      expect(result.addedCount).toBe(0);
      expect(result.errors).toHaveLength(2);
    });
  });
});