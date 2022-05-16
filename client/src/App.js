import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import MovieCard from './components/Cards/MovieCard';
import ViewMovies from './components/movie/ViewMovies';

function App() {
  return (
    <div className="App">
      <h1>Welcome to App!</h1>
      <Link to="/movie-view" >Home</Link>
      <Routes>
        <Route path="/" element={<MovieCard />} />
        <Route path="movie-view" element={<ViewMovies />} />
      </Routes>
    </div>
  );
}

export default App;
