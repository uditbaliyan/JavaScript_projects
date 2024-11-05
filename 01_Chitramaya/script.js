const watchedList = document.getElementById('watched-list');
const toWatchList = document.getElementById('to-watch-list');
const searchInput = document.getElementById('search-input'); // Add this line to get the search input element

let movies = { watched: [], toWatch: [] };

a={
    "watched": [
      {
        "title": "The Matrix",
        "dateAdded": "2024-11-05T10:30:00Z",
        "rating": "5/10",
        "genre": "Sci-fi",
        "director": "Wachowski Sisters",
        "yearReleased": 1999,
        "notes": "Classic movie"
      },      
      {
        "title": "Inception",
        "dateAdded": "2024-11-05T10:35:00Z",
        "rating": "5/10",
        "genre": "Sci-fi",
        "director": "Christopher Nolan",
        "yearReleased": 2010,
        "notes": "Recommended by friend"
      }
    ],
    "toWatch": [
      {
        "title": "Inception",
        "dateAdded": "2024-11-05T10:35:00Z",
        "rating": "5/10",
        "genre": "Sci-fi",
        "director": "Christopher Nolan",
        "yearReleased": 2010,
        "notes": "Recommended by friend"
      }
    ]
}

// Filter movies based on search
function filterMovies(movieList, searchTerm) {
    if (!searchTerm) return movieList;
    return movieList.filter(movie => 
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
}

// Fetch movie image from OMDb API
async function fetchMovieImage(title) {
    const xxxxxxx = '68922fd8'; // Replace with your OMDb API key
    const response = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${xxxxxxx}`);
    const data = await response.json();
    return data.Poster ? data.Poster : 'https://via.placeholder.com/150'; // Default image if not found
}


async function loadMovies() {
    try {
        const response = a
        movies = await response.json();
        displayMovies();
    } catch (error) {
        console.error('Error loading movies:', error);
    }
}

async function displayMovies() {
    // Clear existing lists
    watchedList.innerHTML = '';
    toWatchList.innerHTML = '';

    // Display watched movies
    for (const movie of movies.watched) {
        const li = document.createElement('div'); // Changed to div
        li.className = 'movie-item';

        const img = document.createElement('img');
        img.src = await fetchMovieImage(movie.title);
        img.alt = movie.title;
        img.style.width = '100px'; // Adjust the size as needed

        const movieInfo = document.createElement('div');
        movieInfo.className = 'movie-info';
        movieInfo.innerHTML = `${movie.title} (Rating: ${movie.rating})`;

        // Append image and text to the movie item
        li.appendChild(img);
        li.appendChild(movieInfo); // Move text below image

        watchedList.appendChild(li);
    }

    // Display to-watch movies
    for (const movie of movies.toWatch) {
        const li = document.createElement('div'); // Changed to div
        li.className = 'movie-item';

        const img = document.createElement('img');
        img.src = await fetchMovieImage(movie.title);
        img.alt = movie.title;
        img.style.width = '100px'; // Adjust the size as needed

        const movieInfo = document.createElement('div');
        movieInfo.className = 'movie-info';
        movieInfo.innerHTML = `${movie.title} (Rating: ${movie.rating})`;

        // Append image and text to the movie item
        li.appendChild(img);
        li.appendChild(movieInfo); // Move text below image

        toWatchList.appendChild(li);
    }
}


// Event listener for search input
searchInput.addEventListener('input', displayMovies);

// Load movies on page load
loadMovies();
