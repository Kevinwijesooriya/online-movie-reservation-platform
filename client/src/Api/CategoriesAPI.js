import {useState, useEffect} from 'react'
import axios from 'axios'

function CategoriesAPI() {
    const [categories, setCategories] = useState([])
    const [callback, setCallback] = useState(false)

    useEffect(() =>{
        const getCategories = async () =>{
            try {
                const res = await axios.get('http://localhost:5000/api/catelog')
                // When Integrated using WSO2 Use http://localhost:8290/movies/getMovieCategories 
                setCategories(res.data)
            } catch (error) {

                
            }
            
        }

        getCategories()
    },[callback])
    return {
        
        categories: [categories, setCategories],
        callback: [callback, setCallback]
    }
}

export default CategoriesAPI