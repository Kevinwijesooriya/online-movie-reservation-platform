import {useState, useEffect} from 'react'
import axios from 'axios'

function UserAPI(token) {
    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [userDetails, setUserDetails] = useState("")
    

    useEffect(() =>{
        if(token){
            //console.log(token);
            const getUser = async () =>{
                try {
                    const res = await axios.get('/api/user/infor', {
                        headers: {Authorization: token}
                    })

                    setIsLogged(true)
                    res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false)

                   //console.log(res);
                    setUserDetails(res.data)

                } catch (err) {
                    console.log(err);
                    //alert(err.response.data.msg)
                    sessionStorage.clear();
                    localStorage.clear();
                    window.location.href = "/login";
                }
            }

            getUser()
            
        }
    },[token])


    return {
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],
        user:[userDetails, setUserDetails]
    }
}

export default UserAPI;