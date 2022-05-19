import React, {useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { GlobalState } from '../../GlobalState'

const Tickects = () => {
    const state = useContext(GlobalState)
    const [isAdmin] = state.userAPI.isAdmin
    const [tickets,setTickets] = state.userAPI.tickets;
    const [token] = state.token
    

    console.log(tickets);
    
  return (
    <div></div>
  )
}

export default Tickects