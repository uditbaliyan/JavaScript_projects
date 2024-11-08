async function fetchBooks() {
    const response = await fetch('https://raw.githubusercontent.com/uditbaliyan/JavaScript_projects/main/02_Pustakālaya/books.json'); // Fetch data from JSON file
    const bookData = await response.json();

    displayBooks(bookData.read, 'readBooks');
    displayBooks(bookData.toRead, 'toReadBooks');
}

function displayBooks(books, elementId) {
    const container = document.getElementById(elementId);
    container.innerHTML = ''; // Clear previous content

    for (const book of books) {
        const bookElement = document.createElement('div');
        bookElement.classList.add('book');

        bookElement.innerHTML = `
            <h3><a href="${book.wiki}" target="_blank">${book.title}</a></h3>
            <p class="author">By ${book.author}</p>
        `;

        container.appendChild(bookElement);
    }
}

fetchBooks();
