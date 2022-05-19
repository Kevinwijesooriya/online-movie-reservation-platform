import React, {useContext, useState, useEffect} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useParams, Link} from 'react-router-dom';
import CreditCardForm from './CreditCardForm'
import { GlobalState } from '../../GlobalState';
import axios from 'axios';

const Payment = () => {
  const params = useParams()
    const state = useContext(GlobalState)
    const [tickets,setTickets] = state.userAPI.tickets;
    const [isAdmin] = state.userAPI.isAdmin
    const [data,setData]=useState({
      ticket_id:'',total:''
    });
   
    const [token] = state.token
    const [ticketDetail, setTicketDetail]=useState([]);
    const [userDetails] = state.userAPI.user;

    useEffect(() =>{
      if(params.id){

        tickets.forEach(ticket => {
              if(ticket._id === params.id){ 
                setTicketDetail(ticket);
                setData({ticket_id:ticket._id,total:ticket.total});
              }
          })
      }
  },[params.id, tickets]);

    useEffect(() =>{
      const getTickets = async () =>{
          if (isAdmin) {
              try {
                // When Integrated using WSO2 Use http://localhost:8290/tickets/getTickets
                  const res = await axios.get('http://localhost:5090/api/tickets')
                  setTickets(res.data)
                 
              } catch (error) {
                  console.log(error)
                  
              }
          } else {
              try {
                <ToastContainer/>
                  //console.log(userDetails.email);
                  if(userDetails.email){
                    // When Integrated using WSO2 Use http://localhost:8290/tickets/getMyTicket
                      const res = await axios.get(`http://localhost:5090/api/mytickets/${userDetails.email}`,{
                      headers: {Authorization: token}
                  })
                  setTickets(res.data)
                  console.log(res);
                  }
                  
              } catch (error) {
                  console.log(error)
                  
              }
              
          }
         
          
      }

      getTickets()
  },[token,userDetails.email]);

  return (
    <div className='formBody'>
      <h3>Ticket ID: {ticketDetail._id}</h3>
      <h3>Amount: {ticketDetail.total}LKR</h3>
      <CreditCardForm data={data}/>
      </div>
  )
}

export default Payment