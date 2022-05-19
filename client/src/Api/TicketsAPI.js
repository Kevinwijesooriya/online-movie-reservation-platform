import {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import { GlobalState } from '../GlobalState'

function TicketsAPI() {
    const state = useContext(GlobalState)
    const [tickets, setTickets] = useState([])
    const [callback, setCallback] = useState(false)
    const [isAdmin] = state.userAPI.isAdmin
    const [userDetails] = state.userAPI.user;

    console.log("User Details---",userDetails);
   

   
    return {
        
        tickets: [tickets, setTickets],
        callback: [callback, setCallback]
    }
}

export default TicketsAPI;