document.addEventListener('DOMContentLoaded', () => {
    const addBookForm = document.getElementById('addBookForm');
    const booksList = document.getElementById('booksList');

    const API_URL = '/books';

    // Function to fetch and display books
    async function fetchBooks() {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const books = await response.json();
            renderBooks(books);
        } catch (error) {
            console.error('Error fetching books:', error);
            booksList.innerHTML = '<p>Error loading books. Please try again later.</p>';
        }
    }

    // Function to render books in the list
    function renderBooks(books) {
        booksList.innerHTML = ''; // Clear existing list
        if (books.length === 0) {
            booksList.innerHTML = '<p>No books available.</p>';
            return;
        }
        books.forEach(book => {
            const bookItem = document.createElement('div');
            bookItem.classList.add('book-item');
            bookItem.innerHTML = `
                <h3>${book.title}</h3>
                <p>Author: ${book.author}</p>
                <p>Published Year: ${book.publishedYear}</p>
            `;
            booksList.appendChild(bookItem);
        });
    }

    // Function to add a new book
    async function addBook(event) {
        event.preventDefault();
        const title = event.target.title.value;
        const author = event.target.author.value;
        const publishedYear = parseInt(event.target.publishedYear.value, 10);

        if (!title || !author || isNaN(publishedYear)) {
            alert('Please fill in all fields correctly.');
            return;
        }

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, author, publishedYear }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

            // Clear form and refresh book list
            addBookForm.reset();
            fetchBooks();
        } catch (error) {
            console.error('Error adding book:', error);
            alert(`Error adding book: ${error.message}`);
        }
    }

    // Event listeners
    if (addBookForm) {
        addBookForm.addEventListener('submit', addBook);
    }

    // Initial fetch of books
    fetchBooks();
});