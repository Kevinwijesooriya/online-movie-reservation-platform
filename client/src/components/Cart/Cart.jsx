import React, {useContext, useState, useEffect} from 'react';

import axios from 'axios';
import './cart.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GlobalState } from '../../GlobalState';

function Cart() {
    const state = useContext(GlobalState)
    const [user] = state.userAPI.user
    const [cart, setCart] = state.userAPI.cart
    const [token] = state.token
    const [total, setTotal] = useState(0)
    const [address, setAddress] = useState("")
    console.log(cart);
    const handleChange = (e) => {
        setAddress(e.target.value);
      };
   

    useEffect(() =>{
        const getTotal = () =>{
            const total = cart.reduce((prev, item) => {
                return prev + (item.price * item.quantity)
            },0)

            setTotal(total)
        }

        getTotal()

    },[cart])

    const addToCart = async (cart) =>{
       try {
        const res = await axios.patch('http://localhost:5010/api/user/addcart', {cart}, {
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
    }


    const increment = (id) =>{
        cart.forEach(item => {
            if(item._id === id){
                item.quantity += 1
            }
        })

        setCart([...cart])
        addToCart(cart)
    }

    const decrement = (id) =>{
        cart.forEach(item => {
            if(item._id === id){
                item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1
            }
        })

        setCart([...cart])
        addToCart(cart)
    }

    const removec = id =>{
        if(window.confirm("Do you want to delete this Item?")){
            cart.forEach((item, index) => {
                if(item._id === id){
                    cart.splice(index, 1)
                }
            })

            setCart([...cart])
            addToCart(cart)
        }
    }

    const tranSuccess = async() => {
        if(address==""){
            toast.warning("Pleace fill the Shipping Address", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });

        }else{
            try {
                const res = await axios.post('/api/order', {cart, total, address}, {
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
                    setCart([])
                    addToCart([])
            
                
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
           
        }

       

        
       
    }


    if(cart.length === 0) 
        return <h2 style={{textAlign: "center", fontSize: "5rem"}}>Cart Empty</h2> 

    return (
        <div className='moviedetail'>
            <div className='leftSide '>
            <div className='cartMain'> 
               <ToastContainer/>
               {
                   cart.map(c =>(
                    <div className="cdetail cart" key={c._id}>
                    <img src={c.images.url} alt="" />

                    <div className="cbox-detail">
                        <h2>{c.title}</h2>

                       
                        <p>{c.description}</p>
                      

                        <div className="amount">
                            <button onClick={() => decrement(c._id)}> - </button>
                            <span>{c.quantity}</span>
                            <button onClick={() => increment(c._id)}> + </button>
                        </div>
                        
                        <div className="delete" 
                        onClick={() => removec(c._id)}>
                            X
                        </div>
                    </div>
                </div>
                   ) )
               }
            
        </div>
  
            </div>
            <div className='rightSide formBody sticky'></div>
        </div>
        
    )
}

export default Cart;