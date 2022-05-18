import React, {useState, useContext} from 'react';

import axios from 'axios';
import './location.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GlobalState } from '../../GlobalState';

function Locations() {
    const state = useContext(GlobalState)
    const [locations] = state.locationAPI.locations
    const [location, setLocation] = useState('')
    const [token] = state.token
    const [callback, setCallback] = state.locationAPI.callback
    const [onEdit, setOnEdit] = useState(false)
    const [id, setID] = useState('')

    const createLocation = async e =>{
        e.preventDefault()
        try {
            if(onEdit){
                try {
                    const res = await axios.put(`http://localhost:5080/api/location/${id}`, {location: location}, {
                        headers: {Authorization: token}
                    })
                    toast.success(res.data.msg, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
                    
                } catch (err) {
                    toast.error(err.message, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
                }
               
            }else{
                try {
                    const res = await axios.post('http://localhost:5080/api/location', {location: location}, {
                        headers: {Authorization: token}
                    })
                    toast.success(res.data.msg, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
                    
                } catch (err) {
                    console.log(err)
                    toast.error(err.message, {
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
            setOnEdit(false)
            setLocation('')
            setCallback(!callback)
            
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const editLocation = async (id, location) =>{
        setID(id)
        setLocation(location)
        setOnEdit(true)
    }

    const deleteLocation = async id =>{
        try {
            const res = await axios.delete(`http://localhost:5080/api/location/${id}`, {
                headers: {Authorization: token}
            })
            toast.success(res.data.msg, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
       
            setCallback(!callback)
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

    return (
        <div className="categories formBody">
                 <ToastContainer/>
            <form onSubmit={createLocation}>
                <label htmlFor="location">Location</label>
                <input type="text" name="location" value={location} required
                onChange={e => setLocation(e.target.value)} />

                <button className='btn btn-outline-success'  type="submit">{onEdit? "Update" : "Create"}</button>
            </form>

            <div className="col">
                {
                    locations.map(location => (
                        <div className="row" key={location._id}>
                            <p>{location.location}</p>
                            <div>
                                <button className='btn btn-outline-warning' onClick={() => editLocation(location._id, location.location)}>Edit</button>
                                <button className='btn btn-outline-danger' onClick={() => deleteLocation(location._id)}>Delete</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Locations;