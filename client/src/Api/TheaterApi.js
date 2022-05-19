import {useState, useEffect} from 'react'
import axios from 'axios'


function TheatersAPI() {
    const [theaters, setTheaters] = useState([])
    const [callback, setCallback] = useState(false)
    const [location, setLocation] = useState('')
    const [sort, setSort] = useState('')
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [result, setResult] = useState(0)

    useEffect(() =>{
        const getTheaters = async () => {
            try {
            const res = await axios.get(`http://localhost:5080/api/theaters?limit=${page*9}&${location}&${sort}&title[regex]=${search}`)
            setTheaters(res.data.theaters)
            setResult(res.data.result)
          
            } catch (error) {
                console.log(error);
            }
            
        }
        getTheaters()
    },[callback, location, sort, search, page])
    
    return {
        theaters: [theaters, setTheaters],
        callback: [callback, setCallback],
        location: [location, setLocation],
        sort: [sort, setSort],
        search: [search, setSearch],
        page: [page, setPage],
        result: [result, setResult]
    }
}

export default TheatersAPI;