import {useState, useEffect} from 'react'
import axios from 'axios'

function UserAPI(token) {
    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [userDetails, setUserDetails] = useState("")
    const [cart, setCart] = useState([])
    

    useEffect(() =>{
        if(token){
            //console.log(token);
            const getUser = async () =>{
                try {
                    const res = await axios.get('http://localhost:5010/api/user/infor', {
                        headers: {Authorization: token}
                    })
                    setCart(res.data.cart)
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

    const addCart = async (ticket) => {
        if(!isLogged) return alert("Please login to continue buying")

        const check = cart.every(item =>{
            return item._id !== ticket._id
        })

        if(check){
            setCart([...cart, {...ticket, quantity: 1}])

            await axios.patch('/user/addcart', {cart: [...cart, {...ticket, quantity: 1}]}, {
                headers: {Authorization: token}
            })

        }else{
            alert("This ticket has been added to cart.")
        }
    }


    return {
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],
        user:[userDetails, setUserDetails],
        cart: [cart, setCart],
        addCart: addCart,
    }
}

export default UserAPI;