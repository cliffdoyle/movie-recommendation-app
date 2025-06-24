import React, {useState,useEFfect} from 'react';
import './MovieCard.css';

const MovieCard = ({movie})=>{
    const [posterUrl, setPOsterUrl]=useState('')

    useEFfect(()=>{
        const fetchPoster =async () => {
            const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
            const API_URL = `${import.meta.env.VITE_TMDB_BASE_URL}/trending/movie/week`;

            try{
                const response = await fetch(API_URL);
                const data=await response.json();

                if (data.Poster && data.Poster !=='N/A'){
                    setPOsterUrl(data.Poster);
                }else{
                    // Use a placeholder if no poster is found
                    setPosterUrl('https://via.placeholder.com/200x300.png?text=No+Image');
                }
            }catch (error){
             console.error("Failed to fetch poster from TMDB", error);
                setPosterUrl('https://via.placeholder.com/200x300.png?text=Error');
            }


        };
        if (movie.ids.imdb){
            fetchPoster();
        }
    },[movie.ids.imdb]);

    return (
        <div className='movie-card'>
            <img src={posterUrl} alt={movie.title}/>
            <div className='movie-card-info'>
                <h3>{movie.title}</h3>
                <p>{movie.year}</p>
            </div>
        </div>
    );

};
export default MovieCard
