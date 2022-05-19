import React, {useState, useContext, useEffect} from 'react';
import axios from 'axios';

import Loading from '../utils/loading/Loading';
import {useNavigate, useParams} from 'react-router-dom';
//import  "./createProduct.css";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GlobalState } from '../../GlobalState';

import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';

const initialState = {
    title:"",
    description:"",
    cast:[],
    catelog:[],
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
    const [selectedTheater, setSelectedTheater] = useState("")
    const [theaters] = state.theatersAPI.theaters


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
                // When Integrated using WSO2 Use http://localhost:8290/movies/movieImageUpload
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
            // When Integrated using WSO2 Use http://localhost:8290/movies/movieImageDestroy
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

    const handleChangeInput = e => {
        const { name, value } = e.target
        setMovie({ ...movie, [name]: value })
        console.log("🚀 ~ file: CreateMovie.jsx ~ line 187 ~ CreateMovie ~ movie", movie)
    }
    const handleCastChange = (selectedOption) => {
        let option = [];
        selectedOption.map((cast) => {
            option.push(cast.value)
        })
        setMovie({ ...movie, cast: option })
    }
    const handleCategoryChange = (selectedOption) => {
        let option = [];
        selectedOption.map((category) => {
            option.push(category.value)
        })
        setMovie({ ...movie, catelog: option });
    }
    const handleAvailableTheatersChange = (selectedOption) => {
        let selectedDurations = [];
        if (selectedOption.value) {
            setSelectedTheater(selectedOption.value);
        } else {
            selectedOption.map((category) => {
                selectedDurations.push(category.value)
            })
        }
        setMovie({ ...movie, availableTheaters: [{ theater: selectedTheater, showTime: selectedDurations }] });
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
                // When Integrated using WSO2 Use http://localhost:8290/movies/updateMovie
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
                console.log(movie,images)
                // When Integrated using WSO2 Use http://localhost:8290/movies/addMovies
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
            console.log("🚀 ~ file: CreateMovie.jsx ~ line 268 ~ CreateMovie ~ err", err)
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
    const categoryOptions = [];
    categories.map((category) => (
        categoryOptions.push({ value: category.name, label: category.name })
    ));

    const theaterOptions = [];
    theaters.map((theater) => (
        theaterOptions.push({ value: theater.name, label: theater.name })
    ))

    const durationOptions = [
        { value: '10:00 am', label: '10:00 am' },
        { value: '01:00 pm', label: '01:00 pm' },
        { value: '07:00 pm', label: '07:00 pm' }
    ];

    const castOptions = [];

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
                    <Select
                        onChange={handleCategoryChange}
                        isMulti
                        name="catelog"
                        options={categoryOptions}
                        className="basic-multi-select"
                        classNamePrefix="select"
                    />
                </div>

                <div className="row">
                    <label htmlFor="categories">Cast: </label>
                    <CreatableSelect
                        isClearable
                        onChange={handleCastChange}
                        isMulti
                        name="cast"
                        options={castOptions}
                        className="basic-multi-select"
                        classNamePrefix="select"
                    />
                </div>

                <div className="row">
                    <label htmlFor="categories">Theaters: </label>
                    <Select
                        className="basic-single"
                        classNamePrefix="select"
                        name="theaters"
                        options={theaterOptions}
                        onChange={handleAvailableTheatersChange}
                    />
                </div>

                <div className="row">
                    <label htmlFor="categories">Durations: </label>
                    <Select
                        isMulti
                        name="durations"
                        options={durationOptions}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={handleAvailableTheatersChange}
                    />
                </div>

                <button className='btn btn-outline-success' type="submit">{onEdit? "Update" : "Create"}</button>
            </form>
        </div>
    )
}

export default CreateMovie;
