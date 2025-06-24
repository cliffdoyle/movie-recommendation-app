// src/pages/WatchlistPage.jsx
import React, { useState, useEffect } from 'react';
import { watchlistService } from '../services/watchlistService';
import MovieCard from '../components/MovieCard'; // We will enhance MovieCard soon
import './WatchlistPage.css';

const WatchlistPage = () => {
  // This state holds the movies displayed on this page
  const [watchlist, setWatchlist] = useState([]);
  
  useEffect(() => {
    // When the page loads, get the movies from our service
    setWatchlist(watchlistService.getMovies());
  }, []);

  // This function will be passed down to the movie cards
  const handleRemove = (movieId) => {
    watchlistService.removeMovie(movieId);
    // Update the state to re-render the list without the removed movie
    setWatchlist(currentWatchlist => 
      currentWatchlist.filter(movie => movie.id !== movieId)
    );
  };

  if (watchlist.length === 0) {
    return (
      <div className="watchlist-page">
        <h1>My Watchlist</h1>
        <p className="empty-message">Your watchlist is empty. Add some movies!</p>
      </div>
    );
  }
  
  return (
    <div className="watchlist-page">
      <h1>My Watchlist</h1>
      <div className="movie-grid">
        {watchlist.map(movie => (
          <div key={movie.id} className="watchlist-item-container">
            <MovieCard 
              id={movie.id}
              title={movie.title}
              posterPath={movie.poster_path}
              releaseDate={movie.release_date}
            />
            <button onClick={() => handleRemove(movie.id)} className="remove-button">
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WatchlistPage;