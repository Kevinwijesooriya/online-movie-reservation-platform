import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ViewMovies from './movie/ViewMovies.js';
import MovieCard from './Cards/MovieCard.js';


const MainPages = () => {
  return (
         
        <Routes>
              <Route path="/" element={<MovieCard />} />
              <Route path="movie-view" element={<ViewMovies />} />
        </Routes>

  )
}

export default MainPages