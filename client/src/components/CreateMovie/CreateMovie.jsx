import React, {useState, useContext, useEffect} from 'react';
import axios from 'axios';

import Loading from '../utils/loading/Loading';
import {useNavigate, useParams} from 'react-router-dom';
//import  "./createProduct.css";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GlobalState } from '../../GlobalState';

const initialState = {
    title:"",
    description:"",
    cast:[],
    duration:"",
    availableTheaters:[{theater:"",showTime:[""]}],
    _id: ''
}

function CreateMovie() {
    const state = useContext(GlobalState)
    const [movie, setMovie] = useState(initialState)
    const [categories] = state.categoriesAPI.categories
    const [images, setImages] = useState(false)
    const [loading, setLoading] = useState(false)


    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token

    const history = useNavigate()
    const param = useParams()

    const [movies] = state.moviesAPI.movies
    const [onEdit, setOnEdit] = useState(false)
    const [callback, setCallback] = state.moviesAPI.callback

    useEffect(() => {
        if(param.id){
            setOnEdit(true)
            movies.forEach(movie => {
                if(movie._id === param.id) {
                    setMovie(movie)
                    setImages(movie.images)
                }
            })
        }else{
            setOnEdit(false)
            setMovie(initialState)
            setImages(false)
        }
    }, [param.id, movies])

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
                const res = await axios.post('http://localhost:5000/api/movieimageupload', formData, {
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
            await axios.post('http://localhost:5000/api/movieimagedestroy', {public_id: images.public_id}, {
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
        setMovie({...movie, [name]:value})
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
                const res=await axios.put(`http://localhost:5000/api/updateMovie/${movie._id}`, {...movie, images}, {
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
                const res = await axios.post('http://localhost:5000/api/addMovie', {...movie, images}, {
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
            history.push("/")
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
        <div className="create_product formBody">
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
                    <label htmlFor="product_id">Movie ID</label>
                    <input type="text" name="_id" id="product_id" required
                    value={movie._id} onChange={handleChangeInput} disabled />
                </div>

                <div className="row">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" required
                    value={movie.title} onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="duration">Duration</label>
                    <input type="time" name="duration" id="duration" required
                    value={movie.duration} onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="description">Description</label>
                    <textarea type="text" name="description" id="description" required
                    value={movie.description} rows="5" onChange={handleChangeInput} />
                </div>

               

                <div className="row">
                    <label htmlFor="categories">Categories: </label>
                    <select name="category" value={movie.category} onChange={handleChangeInput} >
                        <option value="">Please select a category</option>
                        {
                            categories.map(category => (
                                <option value={category._id} key={category._id}>
                                    {category.name}
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

export default CreateMovie;
