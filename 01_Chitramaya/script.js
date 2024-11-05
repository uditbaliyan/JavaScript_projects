const watchedList = document.getElementById('watched-list');
const toWatchList = document.getElementById('to-watch-list');
const searchInput = document.getElementById('search-input'); // Get the search input element



const addMovieButton = document.getElementById('add-movie-button');

addMovieButton.addEventListener('click', () => {
    const title = document.getElementById('movie-title').value;
    const rating = document.getElementById('movie-rating').value;
    const genre = document.getElementById('movie-genre').value;
    const director = document.getElementById('movie-director').value;
    const yearReleased = parseInt(document.getElementById('movie-year').value, 10);
    const notes = document.getElementById('movie-notes').value;

    const newMovie = {
        title: title,
        dateAdded: new Date().toISOString(),
        rating: rating,
        genre: genre,
        director: director,
        yearReleased: yearReleased,
        notes: notes
    };

    addMovie(newMovie);

    // Clear the input fields
    document.getElementById('movie-title').value = '';
    document.getElementById('movie-rating').value = '';
    document.getElementById('movie-genre').value = '';
    document.getElementById('movie-director').value = '';
    document.getElementById('movie-year').value = '';
    document.getElementById('movie-notes').value = '';
});









let movies = {
    watched: [],
    toWatch: []
};


// Function to add a new movie
function addMovie(newMovie) {
    // Check if the movie already exists in the watched list
    const exists = movies.watched.some(movie => movie.title.toLowerCase() === newMovie.title.toLowerCase());
    
    if (!exists) {
        // Add the new movie to the watched list
        movies.watched.push(newMovie);
        // Refresh the movie display
        displayMovies();
    } else {
        alert("Movie already exists in the watched list.");
    }
}

// Example usage: Call this function when you want to add a new movie
const newMovie = {
    title: "Interstellar",
    dateAdded: new Date().toISOString(), // Current date and time
    rating: "9/10",
    genre: "Sci-fi",
    director: "Christopher Nolan",
    yearReleased: 2014,
    notes: "Mind-blowing visuals"
};

// Add the new movie
addMovie(newMovie);





// Fetch movies from JSON file
async function loadMovies() {
    try {
        const response = await fetch('movies.json'); // Fetch the JSON file
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        movies = await response.json(); // Parse JSON data
        displayMovies(); // Display the movies after loading them
    } catch (error) {
        console.error('Error loading movies:', error);
    }
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

async function displayMovies() {
    // Clear existing lists
    watchedList.innerHTML = '';
    toWatchList.innerHTML = '';

    // Get the search term
    const searchTerm = searchInput.value;

    // Filter watched movies
    const filteredWatched = filterMovies(movies.watched, searchTerm);
    for (const movie of filteredWatched) {
        await createMovieItem(movie, watchedList);
    }

    // Filter to-watch movies
    const filteredToWatch = filterMovies(movies.toWatch, searchTerm);
    for (const movie of filteredToWatch) {
        await createMovieItem(movie, toWatchList);
    }
}

// Create movie item
async function createMovieItem(movie, list) {
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

    list.appendChild(li);
}

// Event listener for search input
searchInput.addEventListener('input', displayMovies);

// Load movies on page load
loadMovies();
