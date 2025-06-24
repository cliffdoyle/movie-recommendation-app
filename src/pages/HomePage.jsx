import React, {useState,useEffect} from 'react';
import MovieCard from '../components/MovieCard';
import './HomePage.css';

const HomePage = () => {
    //State to hold our list of movies
    const [movies,setMovies] = useState([]);
    //State to handle the loading screen
    const [loading, setLoading] = useState(true)
    //State to handle any API errors
    const [error, setError] = useState(null);

    //useEFfect runs after the component mounts
    useEffect(()=>{
        const fetchTrendingMovies = async ()=>{
            try{
                //Start loading
                setLoading(true);
                //clear previous errors
                setError(null);

                const API_URL = `${import.meta.env.VITE_TMDB_BASE_URL}/trending/movie/week`;

                const API_KEY= import.meta.env.VITE_TMDB_API_KEY;

                const response = await fetch(url, {
                    headers: {
                        Authorization:API_KEY,
                        'Content-Type':'application/json',
                    }

                });
                if (!response.ok){
                    throw new Error(`Something went wrong! Status: ${response.status}`)
                }
                const data = await response.json();
                 // TMDB returns an object with a 'results' array
                 setMovies(data.results);
            }catch (err) {
                setError(err.message);
                console.error("Failed to fetch trending movies:",err);
            }finally{
                //Stop loading, whether successful or not 
                setLoading(false);
            }
        };
        fetchTrendingMovies
        //Empty array means this effect runs only once
    },[])

    //Render logic based on state
    if (loading){
        return <div className="status-message"><p>Loading...</p></div>;
    }

    if (error) {
    return <div className="status-message"><p>Error: {error}</p></div>;
  }

    return (
        <div className='home-page'>
            <h1>Trending Movies</h1>
            <div className='movie-grid'>
                {movies.map(movie=>(
                    <MovieCard
                    key={movie.ids.imdb}
                    movie={movie}
                    />
                ))}
            </div>
        </div>
    );
};

export default HomePage;