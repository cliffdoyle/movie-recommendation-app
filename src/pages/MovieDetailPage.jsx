// src/pages/MovieDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { watchlistService } from '../services/watchlistService';
import './MovieDetailPage.css';

const MovieDetailPage = () => {
  const { movieId } = useParams(); 
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

   // --- 2. Add new state to track if the movie is in the watchlist ---
  const [isInWatchlist, setIsInWatchlist] = useState(
    // Initialize state directly from our service
    watchlistService.isMovieInWatchlist(parseInt(movieId))
  );

  const TMDB_API_KEY = `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`;
  const OMDB_API_KEY = import.meta.env.VITE_OMDB_API_KEY;

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const tmdbUrl = `https://api.themoviedb.org/3/movie/${movieId}?append_to_response=credits`;
        const tmdbResponse = await fetch(tmdbUrl, {
          headers: { Authorization: TMDB_API_KEY }
        });
        if (!tmdbResponse.ok) throw new Error('Failed to fetch movie details from TMDB.');
        
        const tmdbData = await tmdbResponse.json();
        let combinedData = { ...tmdbData };

        if (tmdbData.imdb_id && OMDB_API_KEY) {
          const omdbUrl = `https://www.omdbapi.com/?i=${tmdbData.imdb_id}&apikey=${OMDB_API_KEY}`;
          const omdbResponse = await fetch(omdbUrl);
          
          if (omdbResponse.ok) { // Check if the OMDB fetch was successful
            const omdbData = await omdbResponse.json();
            // Combine OMDB ratings into our main data object
            combinedData.omdbRatings = omdbData.Ratings || [];
          } else {
             console.warn("Could not fetch ratings from OMDB.");
             combinedData.omdbRatings = [];
          }
        }
        
        setDetails(combinedData);

      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [movieId]);

    // --- 3. Add event handlers for the button ---
  const handleToggleWatchlist = () => {
    if (!details) return; // Don't do anything if details haven't loaded

    // Create a simplified movie object to save. We don't need all the details.
    const movieDataToSave = {
      id: details.id,
      title: details.title,
      poster_path: details.poster_path,
      release_date: details.release_date,
    };
    
    if (isInWatchlist) {
      watchlistService.removeMovie(details.id);
      setIsInWatchlist(false);
    } else {
      watchlistService.addMovie(movieDataToSave);
      setIsInWatchlist(true);
    }
  };


  if (loading) return <div className="status-message"><p>Loading details...</p></div>;
  if (error) return <div className="status-message"><p>Error: {error}</p></div>;
  if (!details) return null;

  // --- FIXES ARE IN THIS RETURN BLOCK ---
  const posterUrl = details.poster_path
    ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
    : 'https://via.placeholder.com/500x750.png?text=No+Image';

  // Defensive way to get the year
  const year = details.release_date ? `(${details.release_date.substring(0, 4)})` : '';

  return (
    <div className="detail-page">
      <Link to="/" className="back-link">← Back to Search</Link>
      <div className="detail-content">
        <img src={posterUrl} alt={details.title} className="detail-poster" />
        <div className="detail-info">
               <button onClick={handleToggleWatchlist} className="watchlist-button">
                    {isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
               </button>
          <h1>{details.title} {year}</h1>
          <p className="tagline">{details.tagline}</p>
          
          <h2>Overview</h2>
          <p>{details.overview || 'No overview available.'}</p>
          
          <div className="info-grid">
            <div>
              <h3>Genres</h3>
              {/* Use optional chaining here */}
              <p>{details.genres?.map(g => g.name).join(', ') || 'N/A'}</p>
            </div>
            <div>
              <h3>Runtime</h3>
              <p>{details.runtime ? `${details.runtime} minutes` : 'N/A'}</p>
            </div>
          </div>

          <h2>Ratings</h2>
          <div className="ratings">
             {/* Use optional chaining here */}
             <p><strong>TMDB:</strong> {details.vote_average?.toFixed(1) || 'N/A'} / 10</p>
             {details.omdbRatings?.map(r => (
                <p key={r.Source}><strong>{r.Source}:</strong> {r.Value}</p>
             ))}
          </div>

          <h2>Top Billed Cast</h2>
          <div className="cast-grid">
             {/* Use optional chaining on 'credits' and 'cast' */}
             {details.credits?.cast?.slice(0, 5).map(actor => (
                <div key={actor.cast_id} className="cast-member">
                  <p><strong>{actor.name}</strong> as {actor.character}</p>
                </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;