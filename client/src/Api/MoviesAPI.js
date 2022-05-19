import {useState, useEffect} from 'react'
import axios from 'axios'


function MoviesAPI() {
    const [movies, setMovies] = useState([])
    const [callback, setCallback] = useState(false)
    const [category, setCategory] = useState('')
    const [sort, setSort] = useState('')
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [result, setResult] = useState(0)

    useEffect(() =>{
        const getMovies = async () => {
            const res = await axios.get(`http://localhost:5000/api/movies?limit=${page*9}&${category}&${sort}&title[regex]=${search}`)
            setMovies(res.data.movies)
            setResult(res.data.result)
           
        }
        getMovies()
    },[callback, category, sort, search, page])
    
    return {
        movies: [movies, setMovies],
        callback: [callback, setCallback],
        category: [category, setCategory],
        sort: [sort, setSort],
        search: [search, setSearch],
        page: [page, setPage],
        result: [result, setResult]
    }
}

export default MoviesAPI