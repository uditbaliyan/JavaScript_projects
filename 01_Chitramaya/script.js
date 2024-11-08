async function fetchMovies() {
    const response = await fetch('https://raw.githubusercontent.com/uditbaliyan/JavaScript_projects/main/01_Chitramaya/movies.json');
    const movieData = await response.json();
    displayMovies(movieData.watched, 'watchedMovies');
    displayMovies(movieData.toWatch, 'toWatchMovies');
}

function displayMovies(movies, elementId) {
    const container = document.getElementById(elementId);
    container.innerHTML = ''; // Clear previous content

    for (const movie of movies) {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');
        movieElement.innerHTML = `
            <h3><a href="${movie.wiki}" target="_blank">${movie.title}</a></h3>
            <p class="author">Directed by: ${movie.author}</p>
            <button onclick="showDetails('${movie.title}', this)">View Details</button>
            <div class="details" style="display:none;"></div>
        `;

        container.appendChild(movieElement);
    }
}

async function showDetails(title, button) {
    let overlay = document.querySelector('.overlay');
    
    // Create overlay if it doesn't exist
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'overlay';
        document.body.appendChild(overlay);
    }
    
    const detailsContainer = document.createElement('div');
    detailsContainer.className = 'details-container';

    // Fetch movie information and display it in the overlay
    if (overlay.style.display === 'none' || !overlay.style.display) {
        const movieInfo = await fetchMovieInfo(title);
        if (movieInfo) {
            detailsContainer.innerHTML = `
                <img src="${movieInfo.Poster}" alt="${movieInfo.Title} Poster">
                <p>${movieInfo.Plot}</p>
            `;
            overlay.appendChild(detailsContainer);
            overlay.style.display = 'flex';
            button.textContent = "Hide Details";
        }
    } else {
        overlay.style.display = 'none';
        overlay.innerHTML = '';
        button.textContent = "View Details";
    }

    // Hide overlay when clicking outside the detailsContainer
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.style.display = 'none';
            overlay.innerHTML = '';
            button.textContent = "View Details";
        }
    });
}


async function fetchMovieInfo(title) {
    const apiKey = '68922fd8'; // Replace with your OMDb API key
    const response = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${apiKey}`);
    const data = await response.json();
    return data.Response === 'True' ? data : null;
}

fetchMovies();
