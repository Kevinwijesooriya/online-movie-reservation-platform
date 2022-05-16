import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import MovieCard from './components/Cards/MovieCard';
import ViewMovies from './components/movie/ViewMovies';
import QRgenerator from './components/Ticket/QRgenerator';
import MoviesTicket from './components/Ticket/MoviesTicket';
import TicketPrint from './components/Ticket/TicketPrint';

function App() {
  return (
    <div className="App">
      <h1>Welcome to App!</h1>
      <Link to="/movie-view" >Home</Link>
      <Routes>
        <Route path="/" element={<MovieCard />} />
        <Route path="qr" element={<QRgenerator />} />
        <Route path="mt" element={<TicketPrint />} />
        <Route path="movie-view" element={<ViewMovies />} />
      </Routes>
    </div>
  );
}

export default App;
