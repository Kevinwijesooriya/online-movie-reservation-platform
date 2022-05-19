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
    const [price ,setPrice]=useState(1000);
    const [total ,setTotal]=useState();
    
    const [cartData , setCartData]=useState({
        total:'',qty:'',selectedTheater:'',selectedShowTime:''
    });
   

   
   
    
  

const cartSubmit=()=>{

}
const onChangeInput=(e)=>{
    const {name, value} = e.target
        setCartData({...cartData, [name]:value})

}

    useEffect(() =>{
        if(params.id){

            movies.forEach(movie => {
                if(movie._id === params.id) setDetailMovie(movie)
            })
        }
    },[params.id, movies]);

    useEffect(() => {
      setTotal(price*cartData.qty)
    }, [cartData,price])
    
  
    console.log(cartData);
    console.log(detailMovie);
    console.log(total);

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
            <div className='row txt2movieD'>
                <div className='col'>Price for one ticket:</div>
                <div className='col'>Rs.{price}</div>
            </div>
         
            
        </div>
        <div className='rightSide formBody2 sticky'>
            <h1>BOOK NOW</h1><br/>
            <form onSubmit={cartSubmit}>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">Theater</label>
            <select name="selectedTheater" value={cartData.selectedTheater} onChange={onChangeInput}
              className="form-control"  >
                        <option value="">Please select a Theater</option>
                        {
                            detailMovie.availableTheaters.map(availableTheaters => (
                                <option value={availableTheaters.theater} key={availableTheaters.theater}>
                                    {availableTheaters.theater}
                                </option>
                            ))
                        }
                    </select>
          </div>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">Show Time</label>
            <select name="selectedShowTime" value={cartData.selectedShowTime} onChange={onChangeInput}
              className="form-control"  >
                        <option value="">Please select a Show Time</option>
                        {
                            detailMovie.availableTheaters.map(availableTheaters => (
                                availableTheaters.showTime.map(time=>(
                                <option value={time} key={time}>
                                    {time}
                                </option>
                                ))
                                
                            ))
                        }
                    </select>
          </div>
          <div className="mb-3">
            <label for="exampleInputqty1" className="form-label">Qty</label>
            <input 
              type="number" 
              name="qty" 
              value={cartData.qty} 
              onChange={onChangeInput}
              className="form-control" 
              id="exampleInputqty1"/>
          </div>
          <div className="mb-3">
            <label for="exampleInputtotal1" className="form-label">Total</label>
            <input 
              type="number" 
              name="total" 
              value={total} 
              onChange={onChangeInput}
              className="form-control" 
              id="exampleInputtotal1" disabled/>
          </div>
          <div className='formRow'>
            <center>
            <button type="submit" className='btn btn-outline-success'>ADD TO CART</button>
            </center>
          </div>
        </form>

   
            
            </div>
    </div>
    </>
  )
}

export default MovieDetails