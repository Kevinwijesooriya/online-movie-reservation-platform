import React, {useContext, useState} from 'react';

import Loading from '../utils/loading/Loading';
import axios from 'axios';
import Filters from './Filters';
import LoadMore from './LoadMore';
import './theater.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GlobalState } from '../../GlobalState';
import TheaterCard from '../utils/theaterCard/TheaterCard';
import { Link } from 'react-router-dom';


function Theaters() {
    const state = useContext(GlobalState)
    const [theaters, setTheaters] = state.theatersAPI.theaters
    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token
    const [callback, setCallback] = state.theatersAPI.callback
    const [loading, setLoading] = useState(false)
    const [isCheck, setIsCheck] = useState(false)

    const handleCheck = (id) =>{
        theaters.forEach(theater => {
            if(theater._id === id) theater.checked = !theater.checked
        })
        setTheaters([...theaters])
    }

    const deleteTheater = async(id, public_id) => {
        try {
            setLoading(true)
            // When Integrated using WSO2 Use http://localhost:8290/movies/movieImageDestroy
            const destroyImg = axios.post('http://localhost:5080/api/destroy', {public_id},{
                headers: {Authorization: token}
            })
            // When Integrated using WSO2 Use http://localhost:8290/theaters/deleteTheater
            const deletetheater = axios.delete(`http://localhost:5080/api/theaters/${id}`, {
                headers: {Authorization: token}
            })

            const res = await destroyImg
            const res2 = await deletetheater
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
        theaters.forEach(theater => {
            theater.checked = !isCheck
        })
        setTheaters([...theaters])
        setIsCheck(!isCheck)
    }

    const deleteAll = () =>{
        theaters.forEach(theater => {
            if(theater.checked) deleteTheater(theater._id, theater.images.public_id)
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
                <Link className='btn btn-outline-success' to={"/create_theater"}>Add a Theater</Link>
            </div>
        }

        <div className="cardBody">
            {
                theaters.map(theater => {
                    return <TheaterCard key={theater._id} theater={theater}
                    isAdmin={isAdmin} deleteTheater={deleteTheater} handleCheck={handleCheck} />
                })
            } 
        </div>

        <LoadMore />
        {theaters.length === 0 && "No Thearters Available"}
        </>
    )
}

export default Theaters;