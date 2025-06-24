import { Routes,Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MovieDetailPage from './pages/MovieDetailPage';

function App(){
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/movie/:movieId" element={<MovieDetailPage/>}/>
      </Routes>
      
    </div>
  )
}

export default App