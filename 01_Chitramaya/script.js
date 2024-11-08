async function fetchMovies() {
    const response = await fetch('movies.json');
    const movieData = await response.json();
    displayMovies(movieData.watched, 'watchedMovies');
    displayMovies(movieData.toWatch, 'toWatchMovies');
}

async function displayMovies(movies, elementId) {
    const container = document.getElementById(elementId);
    container.innerHTML = ''; // Clear previous content
    for (const movie of movies) {
        const movieInfo = await fetchMovieInfo(movie.title);
        if (movieInfo) {
            const movieElement = document.createElement('div');
            movieElement.classList.add('movie');
            movieElement.innerHTML = `
                <img src="${movieInfo.Poster}" alt="${movieInfo.Title} Poster">
                <h3><a href="https://en.wikipedia.org/wiki/${movie.title}" target="_blank">${movieInfo.Title}</a></h3>
                <p>${movieInfo.Plot}</p>
            `;
            container.appendChild(movieElement);
        }
    }
}

async function fetchMovieInfo(title) {
    const apiKey = '68922fd8'; // Replace with your OMDb API key
    const response = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${apiKey}`);
    const response = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${apiKey}`);
    const data = await response.json();
    return data.Response === 'True' ? data : null;
}

fetchMovies();