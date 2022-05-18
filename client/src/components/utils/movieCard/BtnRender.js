import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import { GlobalState } from '../../../GlobalState';




function BtnRender({movie, deleteMovie}) {
    const state = useContext(GlobalState)
    const [isAdmin] = state.userAPI.isAdmin


    
    return (
        <div className="row_btn">
            {
                isAdmin ? 
                <>
                    <Link id="btn_buy" className='btn btn-outline-danger' to="#!" 
                    onClick={() =>deleteMovie(movie._id, movie.images.public_id)}>
                        Delete
                    </Link>
                    <Link id="btn_view" className='btn btn-outline-warning' to={`/edit_movie/${movie._id}`}>
                        Edit
                    </Link>
                </>
                : <>
                    <Link id="btn_view" className='btn btn-outline-success' to={`/moviedetail/${movie._id}`}>
                        View Details
                    </Link>
                </>
            }
                
        </div>
    )
}

export default BtnRender;