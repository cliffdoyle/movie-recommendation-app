// src/services/watchlistService.js

const WATCHLIST_KEY = 'movieWatchlist';

// Helper function to get the watchlist from localStorage
const getWatchlist = () => {
  const watchlist = localStorage.getItem(WATCHLIST_KEY);
  // Parse it from JSON, or return an empty array if it doesn't exist yet
  return watchlist ? JSON.parse(watchlist) : [];
};

// Helper function to save the watchlist to localStorage
const saveWatchlist = (watchlist) => {
  localStorage.setItem(WATCHLIST_KEY, JSON.stringify(watchlist));
};

// --- Our main service object ---
export const watchlistService = {
  // Add a movie to the watchlist
  addMovie: (movie) => {
    const watchlist = getWatchlist();
    // Check if the movie is already in the list
    if (!watchlist.some(item => item.id === movie.id)) {
      watchlist.push(movie);
      saveWatchlist(watchlist);
    }
  },

  // Remove a movie from the watchlist
  removeMovie: (movieId) => {
    let watchlist = getWatchlist();
    watchlist = watchlist.filter(item => item.id !== movieId);
    saveWatchlist(watchlist);
  },

  // Check if a specific movie is in the watchlist
  isMovieInWatchlist: (movieId) => {
    const watchlist = getWatchlist();
    return watchlist.some(item => item.id === movieId);
  },
  
  // Expose the getter for use in other components
  getMovies: getWatchlist, 
   toggleWatchedStatus: (movieId) => {
    let watchlist = getWatchlist();
    const movieIndex = watchlist.findIndex(item => item.id === movieId);
    if (movieIndex > -1) {
      // Toggle the 'watched' property, or set it to true if it doesn't exist
      watchlist[movieIndex].watched = !watchlist[movieIndex].watched;
      saveWatchlist(watchlist);
    }
  },
};