import {useState, useEffect} from 'react'
import axios from 'axios'

function UserAPI(token) {
    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [isSuperAdmin, setIsSuperAdmin] = useState(false)
    const [userDetails, setUserDetails] = useState("")
    const [cart, setCart] = useState([])
    const [tickets, setTickets] = useState([])
    
    
    useEffect(() =>{
        if(token){
            //console.log(token);
            const getUser = async () =>{
                try {
                  // When Integrated using WSO2 Use http://localhost:8290/users/getUser
                    const res = await axios.get('http://localhost:5010/api/user/infor', {
                        headers: {Authorization: token}
                    })
                    setCart(res.data.cart)
                    setIsLogged(true)
                    res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false)
                    if(res.data.role === 2){
                        setIsSuperAdmin(true) 
                        setIsAdmin(true)
                    }else{
                        setIsSuperAdmin(false)
                    }
                    

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
   

    const addCart = async (movie,total,cartData) => {
        if(!isLogged) return alert("Please login to continue buying")

        const check = cart.every(item =>{
            return item._id !== movie._id
        })

        if(check){
            setCart([...cart, {...movie,...cartData,total, quantity: 1}])
            // When Integrated using WSO2 Use http://localhost:8290/users/addCart
            await axios.patch('http://localhost:5010/api/user/addcart', {cart: [...cart, {...movie,...cartData,total, quantity: 1}]}, {
                headers: {Authorization: token}
            })

        }else{
            alert("This ticket has been added to cart.")
        }
    }


    return {
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],
        isSuperAdmin: [isSuperAdmin, setIsSuperAdmin],
        user:[userDetails, setUserDetails],
        cart: [cart, setCart],
        addCart: addCart,
        tickets: [tickets, setTickets],
    }
}

export default UserAPI;