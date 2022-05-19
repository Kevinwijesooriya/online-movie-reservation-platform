import React, {useContext, useEffect, useState} from 'react'
import {Fab, TextField, TextareaAutosize, Grid} from '@material-ui/core'
import QRcode from 'qrcode.react'
import './Ticket.css';
import { Link, useParams } from 'react-router-dom';
import { cardActionsClasses } from '@mui/material';
import { GlobalState } from '../../GlobalState'
import axios from 'axios';

export default function QRgenerator() {
	// const state = useContext(GlobalState)
    // const [isAdmin] = state.userAPI.isAdmin
	// const [token] = state.token
	const { id } = useParams();  
	const [qr, setQr] = useState(id);
	const [Ticket, setTicket] = useState({
		name: "",
		cart:[],
		isPaid:""
       });
	//    const {name,cart[""],ispaid}=Ticket

	   useEffect(() => {

		const getTicket=async()=>{
			try {
			 const res = await axios.get(`http://localhost:5090/api/ticket/${id}`, {
						//   headers: {Authorization: token}
					  }) 
					  setTicket(res.data)
					  console.log("mytiket",res);
					}
			 catch (error) {
			 
				
			}
		  }
		  getTicket()
	  }, [id]);

	
  return (
    <div class="body">QRgenerator
      <div class="ticket">
	<div class="left">
		<div class="image">
			<p class="admit-one">
				{/* <span>ADMIT ONE</span>
				<span>ADMIT ONE</span>
				<span>ADMIT ONE</span> */}
			</p>
			<div class="ticket-number">
				<p>
					{/* #20030220 */}
				</p>
			</div>
		</div>
		
		<div class="ticket-info">
		{Ticket.cart.map((tck)=>(
			<p class="date">
				<span>TUESDAY</span>
				<span class="june-29">JUNE 29TH</span>
				<span>2021</span>
			</p>
			))
		}
		{Ticket.cart.map((tck)=>(
			<div class="show-name">
                <h1>{tck.title}</h1>
				<h2>OMT MOVIES</h2>
			</div>
			))
		}
			{Ticket.cart.map((tck)=>(
			<div class="time">
				<p>{tck.selectedShowTime}</p>
				<p>DOORS <span>@</span> {tck.selectedTheater}</p>
			</div>
			))
		}
			<p class="location"><span>movies </span>
				<span class="separator"><i class="far fa-smile"></i></span><span>Salt Lake City, Srilanaka</span>
			</p>
		</div>
		
	</div>
	<div class="right">
		{/* <p class="admit-one">
			<span>ADMIT ONE</span>
			<span>ADMIT ONE</span>
			<span>ADMIT ONE</span>
		</p> */}
		<div class="right-info-container">
			<div class="show-name">
				{/* <h1>SOUR Prom</h1> */}
			</div>
			<div class="time">
				{/* <p>8:00 PM <span>TO</span> 11:00 PM</p>
				<p>DOORS <span>@</span> 7:00 PM</p> */}
			</div>
			<div class="barcode">
            <div>
                {
                    qr ?
                    <QRcode 
                        id="myqr"
                        value={qr} 
                        size={150}
                        includeMargin={true}
                    /> :
                    <p>No QR code preview</p>
                }
            </div>
                {/* <img src="https://external-preview.redd.it/cg8k976AV52mDvDb5jDVJABPrSZ3tpi1aXhPjgcDTbw.png?auto=webp&s=1c205ba303c1fa0370b813ea83b9e1bddb7215eb" alt="QR code"/> */}
			</div>
			<p class="ticket-number">
				{/* #20030220 */}
			</p>
		</div>
	</div>
</div> 
{/* <Link className="nav-link" to={`/viewTicket/${id}/TicketPrint`}>create ticket</Link> */}
    </div>
  )
}
