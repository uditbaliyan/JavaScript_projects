document.addEventListener('DOMContentLoaded', () => {
    const watchedList = document.getElementById('watched-list');
    const toWatchList = document.getElementById('to-watch-list');
    const searchInput = document.getElementById('search-input');
    const addMovieButton = document.getElementById('add-movie-button');

    let movies = { watched: [], toWatch: [] };

    // Fetch and load movies from JSON
    async function loadMovies() {
        try {
            const response = await fetch('movies.json'); // Adjust path if needed
            if (!response.ok) throw new Error('Network response was not ok');
            movies = await response.json();
            displayMovies();
        } catch (error) {
            console.error('Error loading movies:', error);
        }
    }

    // Display movies (with filtering)
    async function displayMovies() {
        watchedList.innerHTML = '';
        toWatchList.innerHTML = '';
        const searchTerm = searchInput.value.toLowerCase();

        // Display filtered watched movies
        for (const movie of filterMovies(movies.watched, searchTerm)) {
            createMovieItem(movie, watchedList);
        }

        // Display filtered to-watch movies
        for (const movie of filterMovies(movies.toWatch, searchTerm)) {
            createMovieItem(movie, toWatchList);
        }
    }

    // Filter movies by search term
    function filterMovies(movieList, searchTerm) {
        return movieList.filter(movie => movie.title.toLowerCase().includes(searchTerm));
    }

    // Fetch movie image from OMDb API
    async function fetchMovieImage(title) {
        const apiKey = '68922fd8'; // Replace with your OMDb API key
        try {
            const response = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${apiKey}`);
            const data = await response.json();
            return data.Poster || 'https://via.placeholder.com/150';
        } catch (error) {
            console.error("Error fetching movie image:", error);
            return 'https://via.placeholder.com/150';
        }
    }



    // Clear input fields
    function clearInputs() {
        document.getElementById('movie-title').value = '';
        document.getElementById('movie-rating').value = '';
        document.getElementById('movie-genre').value = '';
        document.getElementById('movie-director').value = '';
        document.getElementById('movie-year').value = '';
        document.getElementById('movie-notes').value = '';
    }

    // Search and display movies on input
    searchInput.addEventListener('input', displayMovies);

    // Load movies on page load
    loadMovies();
});
