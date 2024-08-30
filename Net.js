// Base URL for the API
const API_BASE_URL = "https://api.themoviedb.org/3"; // Replace with actual API base URL
const API_KEY = "api_key=0d7fcb538472b4a248392fdaf9ae8532";

const banner_url="https://image.tmdb.org/t/p/original";
const img_url="https://image.tmdb.org/t/p/w300";

// Fetch trending movies
async function fetchTrendingMovies() {
    const response = await fetch(`${API_BASE_URL}/trending/movies?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;
}

// Fetch top-rated TV shows
async function fetchTopRatedShows() {
    const response = await fetch(`${API_BASE_URL}/tv/top-rated?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;
}

// Fetch genres
async function fetchGenres() {
    const response = await fetch(`${API_BASE_URL}/genres?api_key=${API_KEY}`);
    const data = await response.json();
    return data.genres;
}

// Display movies on the front page
function displayMovies(movies) {
    const moviesContainer = document.querySelector('#trending-movies');
    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');
        movieElement.innerHTML = `
            <img src="${movie.poster_path}" alt="${movie.title}">
            <h3>${movie.title}</h3>
        `;
        moviesContainer.appendChild(movieElement);
    });
}

// Display shows on the front page
function displayShows(shows) {
    const showsContainer = document.querySelector('#top-rated-shows');
    shows.forEach(show => {
        const showElement = document.createElement('div');
        showElement.classList.add('show');
        showElement.innerHTML = `
            <img src="${show.poster_path}" alt="${show.name}">
            <h3>${show.name}</h3>
        `;
        showsContainer.appendChild(showElement);
    });
}

// Display genres
function displayGenres(genres) {
    const genresContainer = document.querySelector('#genres');
    genres.forEach(genre => {
        const genreElement = document.createElement('span');
        genreElement.classList.add('genre');
        genreElement.textContent = genre.name;
        genresContainer.appendChild(genreElement);
    });
}

// Initialize the front page
async function initFrontPage() {
    const [trendingMovies, topRatedShows, genres] = await Promise.all([
        fetchTrendingMovies(),
        fetchTopRatedShows(),
        fetchGenres()
    ]);

    displayMovies(trendingMovies);
    displayShows(topRatedShows);
    displayGenres(genres);
}

// Run the initialization function when the page loads
document.addEventListener('DOMContentLoaded', initFrontPage);
