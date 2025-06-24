import React, {useState,useEffect} from 'react';
import MovieCard from '../components/MovieCard';
import Searchbar from '../components/Searchbar';
import './HomePage.css';

const HomePage = () => {
    //State to hold our list of movies
    const [movies,setMovies] = useState([]);
    //State to handle the loading screen
    const [loading, setLoading] = useState(true)
    //State to handle any API errors
    const [error, setError] = useState(null);

    //New state for search and pagination
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    //use a different state for the heading to improve user experience
    const [header, setHeader] = useState('Trending Movies');
    
    const API_KEY = `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`;
    const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
    

    //useEFfect runs after the component mounts
    //Effect for Fetching Data (Trending or Search)
    useEffect(()=>{
        //This function will fetch either trending or search results

        const fetchData = async ()=>{
            //Start loading
            setLoading(true);
            //clear previous errors
            setError(null);
            
            let url='';
            
            if (searchTerm){
                //We are searching
                setHeader(`Search Results for "${searchTerm}"`);
                url=`${BASE_URL}/search/movie?query=${searchTerm}&page=${currentPage}`
            }else{
                //We are on the default page (trending)
                setHeader('Trending Movies');
                url=`${BASE_URL}/trending/movie/week?page=${currentPage}`
            }
            
            try{

                const response = await fetch(url, {
                    headers: {
                        //We construct the "Bearer" token here
                        Authorization:API_KEY,
                        'Content-Type':'application/json',
                    }

                });
                if (!response.ok){
                    throw new Error(`Something went wrong! Status: ${response.status}`)
                }
                const data = await response.json();
                setTotalPages(data.total_pages);//Store the total pages for pagination
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
        //Debounce logic
        const timerId = setTimeout (()=>{
            fetchData();
        },500) //wait for 500ms after 
        
        //cleanup function: this runs before the next effect or when the component unmounts
        return () => {
            clearTimeout(timerId)
            
        }
        //Empty array means this effect runs only once
        //This effect re-runs whenever the searchTerm or currentPage
    
    },[searchTerm,currentPage]);

    //Pagination Handlers
    const handleNextPage=()=>{
        if (currentPage < totalPages){
            setCurrentPage(prevPage=> prevPage+1)
        }
    };

     const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

     const handleSearchChange = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
    setCurrentPage(1); // Reset to page 1 for every new search
  };

   return (
    <div className='home-page'>
      {/* 2. Add the Searchbar component */}
      <Searchbar searchTerm={searchTerm} onSearchChange={handleSearchChange} />

      {/* 3. Use a dynamic header */}
      <h1>{header}</h1>

      {/* Render logic based on state */}
      {loading && <div className="status-message"><p>Loading...</p></div>}
      {error && <div className="status-message"><p>Error: {error}</p></div>}

      {/* Only show movie grid and pagination if not loading and no error */}
      {!loading && !error && (
        <>
          <div className='movie-grid'>
            {movies.map(movie => (
              <MovieCard
                key={movie.id} 
                title={movie.title}
                posterPath={movie.poster_path}
                releaseDate={movie.release_date}
              />
            ))}
          </div>
          
          {/* 4. Add the Pagination controls */}
          {movies.length > 0 && (
             <div className="pagination">
                <button onClick={handlePrevPage} disabled={currentPage === 1}>
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                    Next
                </button>
             </div>
          )}
        </>
      )}
    </div>
  );
};

export default HomePage;