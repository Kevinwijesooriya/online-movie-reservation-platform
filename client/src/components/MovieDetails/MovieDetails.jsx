import React, {useContext, useState, useEffect} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useParams, Link} from 'react-router-dom';
import { GlobalState } from '../../GlobalState';

const MovieDetails = () => {
    const params = useParams()
    const state = useContext(GlobalState)
    const [movies] = state.moviesAPI.movies
    const addCart = state.userAPI.addCart
    const [detailMovie, setDetailMovie] = useState([])

    useEffect(() =>{
        if(params.id){

            movies.forEach(movie => {
                if(movie._id === params.id) setDetailMovie(movie)
            })
        }
    },[params.id, movies])

    if(detailMovie.length === 0) return null;
  return (
    <>
    <div className='moviedetail'>
        <div className='leftSide'>
            <div className='row'><img src={detailMovie.images.url} alt={detailMovie.title}/></div><br/>
            <div className='row txt2movieD'>
                <div className='col'>Title:</div>
                <div className='col'> {detailMovie.title}</div></div>
            <div className='row txt2movieD'>
                <div className='col'>Duration:</div>
                <div className='col'> {detailMovie.duration}h</div></div>
            <div className='row txt2movieD'>
                <div className='col'>Description:</div>
                <div className='col txt3movieD' >{detailMovie.description}</div>
            </div>
            <div className='row txt2movieD'>
                <div className='col'>Categories:</div>
                <div className='col'>{detailMovie.catelog}</div>
            </div>
            <div className='row txt2movieD'>
                <div className='col'>Cast:</div>
                <div className='col'>{detailMovie.cast}</div>
            </div>
         
            
        </div>
        <div className='rightSide formBody sticky'>
            <h1>BOOK NOW</h1><br/>
            <center>
            <button className='btn btn-outline-success'>ADD TO CART</button>
            </center>
            </div>
    </div>
    </>
  )
}

export default MovieDetails