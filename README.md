# Book Management REST API

A TypeScript-based REST API for managing books with CRUD operations and CSV import functionality.

## Features

- CRUD operations for books (Create, Read, Update, Delete)
- Bulk import of books via CSV file
- TypeScript implementation
- Request logging with Morgan
- Centralized error handling
- Unit tests with Jest

## Prerequisites

- Node.js (v14 or higher)
- npm

## Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/book-management-api
cd book-management-api
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following content:
```
PORT=3000
NODE_ENV=development
```

## Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm run build
npm start
```

### Running Tests
```bash
npm test
```

## API Endpoints

### Get All Books
- **GET** `/books`
- Returns a list of all books

### Get Book by ID
- **GET** `/books/:id`
- Returns details of a specific book

### Create Book
- **POST** `/books`
- Creates a new book
- Request body:
```json
{
  "title": "Book Title",
  "author": "Author Name",
  "publishedYear": 2023
}
```

### Update Book
- **PUT** `/books/:id`
- Updates an existing book
- Request body: Same as Create Book

### Delete Book
- **DELETE** `/books/:id`
- Deletes a book

### Import Books (CSV)
- **POST** `/books/import`
- Imports multiple books from a CSV file
- Request: Form data with key 'file' containing the CSV file
- CSV Format:
```
title,author,publishedYear
Book 1,Author 1,2023
Book 2,Author 2,2022
```

## Error Handling

The API uses standard HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 404: Not Found
- 500: Internal Server Error

## Project Structure

```
src/
├── controllers/     # Request handlers
├── middleware/      # Custom middleware
├── routes/          # API routes
├── services/        # Business logic
├── types/           # TypeScript interfaces
└── app.ts           # Application entry point
```