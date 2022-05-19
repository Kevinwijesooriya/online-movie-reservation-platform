import {useState, useEffect} from 'react'
import axios from 'axios'

function LocationAPI() {
    const [locations, setLocations] = useState([])
    const [callback, setCallback] = useState(false)

    useEffect(() =>{
        const getLocations = async () =>{
            try {
                const res = await axios.get('http://localhost:5080/api/location')
                // When Integrated using WSO2 Use http://localhost:8290/theaters/getTheaterLocation
                setLocations(res.data)
               
            } catch (error) {
                console.log(error)
                
            }
            
        }

        getLocations()
    },[callback])
    return {
        
        locations: [locations, setLocations],
        callback: [callback, setCallback]
    }
}

export default LocationAPI;