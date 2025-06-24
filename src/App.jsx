import { Routes,Route } from "react-router-dom";
import Header from './components/Header';  
import HomePage from "./pages/HomePage";
import MovieDetailPage from './pages/MovieDetailPage';
import WatchlistPage from './pages/WatchlistPage';

function App(){
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/movie/:movieId" element={<MovieDetailPage/>}/>
          <Route path="/watchlist" element={<WatchlistPage />} /> 
      </Routes>
      
    </div>
  )
}

export default App