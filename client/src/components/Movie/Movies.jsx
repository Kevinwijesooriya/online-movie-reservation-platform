import React, {useContext, useState} from 'react';
import Loading from '../utils/loading/Loading';
import axios from 'axios';
import Filters from './Filters';
import LoadMore from './LoadMore';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MovieCard from '../utils/movieCard/MovieCard';
import { GlobalState } from '../../GlobalState';
import { Link } from 'react-router-dom';


function Movies() {
    const state = useContext(GlobalState)
    const [movies, setMovies] = state.moviesAPI.movies
    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token
    const [callback, setCallback] = state.moviesAPI.callback
    const [loading, setLoading] = useState(false)
    const [isCheck, setIsCheck] = useState(false)

    const handleCheck = (id) =>{
        movies.forEach(movie => {
            if(movie._id === id) movie.checked = !movie.checked
        })
        setMovies([...movies])
    }

    const deleteMovie = async(id, public_id) => {
        try {
            setLoading(true)
            // When Integrated using WSO2 Use http://localhost:8290/movies/movieImageDestroy
            const destroyImg = axios.post('http://localhost:5000/api/movieimagedestroy', {public_id},{
                headers: {Authorization: token}
            })
            // When Integrated using WSO2 Use http://localhost:8290/movies/movieDelete
            const deleteMovie = axios.delete(`http://localhost:5000/api/delete/${id}`, {
                headers: {Authorization: token}
            })

            const res = await destroyImg
            const res2 = await deleteMovie
            toast.success(res.data.msg, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            toast.success(res2.data.msg, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            setCallback(!callback)
            setLoading(false)
        } catch (err) {
           
            toast.error(err.response.data.msg, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }
    }

    const checkAll = () =>{
        movies.forEach(movie => {
            movie.checked = !isCheck
        })
        setMovies([...movies])
        setIsCheck(!isCheck)
    }

    const deleteAll = () =>{
        movies.forEach(movie => {
            if(movie.checked) deleteMovie(movie._id, movie.images.public_id)
        })
    }

    if(loading) return <div><Loading /></div>
    return (
        <>
        <Filters />
        <ToastContainer/>
        
        {
            isAdmin && 
            <div className="delete-all">
                <span>Select all</span>
                <input type="checkbox" checked={isCheck} onChange={checkAll} />
                <button className='btn btn-outline-danger' onClick={deleteAll}>Delete ALL</button>
                <Link className='btn btn-outline-success' to={"/create_movie"}>Add a Movie</Link>
            </div>
        }

        <div className="cardBody">
            {
                movies.map(movie => {
                    return <MovieCard key={movie._id} movie={movie}
                    isAdmin={isAdmin} deleteMovie={deleteMovie} handleCheck={handleCheck} />
                })
            } 
        </div>

        <LoadMore />
        {movies.length === 0 && "No Movies Available"}
        </>
    )
}

export default Movies