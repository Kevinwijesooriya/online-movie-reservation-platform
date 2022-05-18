import React, {useState, useContext, useEffect} from 'react';
import axios from 'axios';

import Loading from '../utils/loading/Loading';
import {useNavigate, useParams} from 'react-router-dom';
import  "./createTheater.css";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GlobalState } from '../../GlobalState';

const initialState = {
    name: '',
    location: '',
    _id: ''
}

function CreateTheater() {
    const state = useContext(GlobalState)
    const [theater, setTheater] = useState(initialState)
    const [locations] = state.locationAPI.locations
    const [images, setImages] = useState(false)
    const [loading, setLoading] = useState(false)


    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token

    const history = useNavigate()
    const param = useParams()

    const [theaters] = state.theatersAPI.theaters
    const [onEdit, setOnEdit] = useState(false)
    const [callback, setCallback] = state.theatersAPI.callback

    useEffect(() => {
        if(param.id){
            setOnEdit(true)
            theaters.forEach(theater => {
                if(theater._id === param.id) {
                    setTheater(theater)
                    setImages(theater.images)
                }
            })
        }else{
            setOnEdit(false)
            setTheater(initialState)
            setImages(false)
        }
    }, [param.id, theaters])

    const handleUpload = async e =>{
        e.preventDefault()
        try {
            if(!isAdmin) return toast.warning("You are no an Admin", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            const file = e.target.files[0]
            
            if(!file) return toast.warning("File not exist.", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });

            if(file.size > 1024 * 1024) // 1mb
                return toast.warning("File too large.", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });

            if(file.type !== 'image/jpeg' && file.type !== 'image/png') // 1mb
                return toast.warning("File format is incorrect.", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });

            let formData = new FormData();
            formData.append('file', file);

            setLoading(true);
            try {
                const res = await axios.post('http://localhost:5080/api/upload', formData, {
                    headers: {'content-type': 'multipart/form-data', Authorization: token}
                })
                setLoading(false);
                toast.success(res.data.msg, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
                setImages(res.data);
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

    const handleDestroy = async () => {
        try {
            if(!isAdmin) return 
            toast.warning("You're not an admin", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            setLoading(true)
            await axios.post('http://localhost:5080/api/destroy', {public_id: images.public_id}, {
                headers: {Authorization: token}
            })
            setLoading(false)
            setImages(false)
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

    const handleChangeInput = e =>{
        const {name, value} = e.target
        setTheater({...theater, [name]:value})
    }

    const handleSubmit = async e =>{
        e.preventDefault()
        try {
            if(!isAdmin) return toast.warning("You're not an admin", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            if(!images) return toast.warning("No image upload", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });

            if(onEdit){
                const res=await axios.put(`http://localhost:5080/api/theaters/${theater._id}`, {...theater, images}, {
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
            }else{
                const res = await axios.post('http://localhost:5080/api/theaters', {...theater, images}, {
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
            }
            setCallback(!callback)
            window.location.href = "/theaters";
            
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

    const styleUpload = {
        display: images ? "block" : "none"
    }
    return (
        <div className="create_product">
             <ToastContainer/>
            <div className="upload">
                <input type="file" name="file" id="file_up" onChange={handleUpload}/>
                {
                    loading ? <div id="file_img"><Loading /></div>

                    :<div id="file_img" style={styleUpload}>
                        <img src={images ? images.url : ''} alt=""/>
                        <span onClick={handleDestroy}>X</span>
                    </div>
                }
                
            </div>

            <form onSubmit={handleSubmit}>
                <div className="row">
                    <label htmlFor="product_id">Theater ID</label>
                    <input type="text" name="_id" id="product_id" required
                    value={theater._id} onChange={handleChangeInput} disabled/>
                </div>

                <div className="row">
                    <label htmlFor="title">Name</label>
                    <input type="text" name="name" id="title" required
                    value={theater.name} onChange={handleChangeInput} />
                </div>
                <div className="row">
                    <label htmlFor="categories">Location: </label>
                    <select name="location" value={theater.location} onChange={handleChangeInput} >
                        <option value="">Please select a Location</option>
                        {
                            locations.map(location => (
                                <option value={location._id} key={location._id}>
                                    {location.location}
                                </option>
                            ))
                        }
                    </select>
                </div>

                <button type="submit">{onEdit? "Update" : "Create"}</button>
            </form>
        </div>
    )
}

export default CreateTheater;