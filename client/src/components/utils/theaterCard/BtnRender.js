import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import { GlobalState } from '../../../GlobalState';

import './theatercard.css';

function BtnRender({theater, deleteTheater}) {
    const state = useContext(GlobalState)
    const [isAdmin] = state.userAPI.isAdmin
    //const addCart = state.userAPI.addCart

    
    return (
        <div className="row_btn">
            {
                isAdmin ? 
                <>
                    <Link id="btn_buy" className='btn btn-outline-danger' to="#!" 
                    onClick={() =>deleteTheater(theater._id, theater.images.public_id)}>
                        Delete
                    </Link>
                    <Link id="btn_view" className='btn btn-outline-warning' to={`/edit_theater/${theater._id}`}>
                        Edit
                    </Link>
                </>
                : <>

                    <Link id="btn_view" className='btn btn-outline-success' to={`/theaterdetail/${theater._id}`}>
                        View
                    </Link>
                </>
            }
                
        </div>
    )
}

export default BtnRender;