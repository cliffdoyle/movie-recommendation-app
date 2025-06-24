import React from 'react';
import './MovieCard.css';

const MovieCard = ({title, posterPath, releaseDate})=>{
   //TMDB gives a 'poster_path'

   const imageUrl = posterPath
   ?`https://image.tmdb.org/t/p/w500${posterPath}`
   :'https://via.placeholder.com/500x750.png?text=No+Image';

   //Extract the year from the release_date (e.g., "2023-10-25")
   const year = releaseDate ? releaseDate.substring(0,4) : 'N/A';

    

    return (
        <div className='movie-card'>
            <img src={imageUrl} alt={`Poster for ${title}`}/>
            <div className='movie-card-info'>
                <h3>{title}</h3>
                <p>{year}</p>
            </div>
        </div>
    );

};
export default MovieCard
