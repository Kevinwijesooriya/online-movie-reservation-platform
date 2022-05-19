import React, {useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { GlobalState } from '../../GlobalState'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './history.css'
const Tickects = () => {
    const state = useContext(GlobalState)
    const [isAdmin] = state.userAPI.isAdmin
    const [tickets,setTickets] = state.userAPI.tickets;
    
    const [token] = state.token
    const [ticketsList, setTicketList]=useState([]);
    const [userDetails] = state.userAPI.user;
    
    // useEffect(() => {
    //   setTicketList(ticketsList);
    // }, [tickets])
    useEffect(() =>{
      const getTickets = async () =>{
          if (isAdmin) {
              try {
                  const res = await axios.get('http://localhost:5090/api/tickets')
                  setTickets(res.data)
                 
              } catch (error) {
                  console.log(error)
                  
              }
          } else {
              try {
                 
                  //console.log(userDetails.email);
                  if(userDetails.email){
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
//console.log(tickets);

const deleteTicket=async(id)=>{
  try {
   const res = await axios.delete(`http://localhost:5090/api/ticket/${id}`, {
                headers: {Authorization: token}
            })
    
  } catch (error) {
    toast.error(error.response.data.msg, {
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


    
  return (
    <div>
       <div className="history-page formBody">
              <ToastContainer/>
            <h2>Tickets</h2>

            <h4>You have {tickets.length} Tickets</h4>

            <table>
                <thead>
                    <tr>
                        <th>Ticket ID</th>
                        <th>Date of Purchased</th>
                        <th>Status</th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
               {
                   
                    tickets.map(items => (
                        <tr key={items._id}>
                            <td>{items._id}</td>
                            <td>{new Date(items.createdAt).toLocaleDateString()}</td>
                            <td>{items.status?<>Conformed</>:<>Pending</>}</td>
                            <td><Link className='btn btn-outline-warning' to={`/ticketDetail/${items._id}`}>View</Link></td>
                            <td>{items.isPaid?<><Link className='btn btn-outline-success' to={`/viewTicket/${items._id}`}>View Ticket</Link></>:<>{!isAdmin?<Link className='btn btn-outline-success' to={`/viewTicket/${items._id}`}>Pay</Link>:<></>}</>}</td>
                            <td><button className='btn btn-outline-danger' onClick={deleteTicket(items._id)}>Delete</button></td>
                        </tr>
                    ))
                
               }
                     
                    
                  
                    
                  
                    
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Tickects