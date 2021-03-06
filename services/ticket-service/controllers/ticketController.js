import Users from '../models/user.js';
import Tickets from '../models/ticket.js';
import Movies from '../models/movies.js';

const ticketController ={
    getTickets:async(req, res) =>{
        try {
            const tickets = await Tickets.find()
            res.json( tickets)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getMyTickets:async(req, res) =>{
        try {
            
            console.log(req.params.email);
            const tickets = await Tickets.find({email: req.params.email})
            res.json( tickets)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    MyTicket:async(req, res) =>{
        try {
            let ticketId = req.params.id;
            // console.log(req.params.email);
            const ticket = await Tickets.findById(ticketId)
            res.json( ticket)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createTicket: async(req, res) => {
        try {
            const user = await Users.findById(req.user.id).select('name phone email')
            if(!user) return res.status(400).json({msg: "User does not exist."})

            const {cart, total} = req.body;

            const {_id, name, email, phone} = user;

            const newTicket = new Tickets({
                user_id: _id, name, email, phone, cart, total
            })

            
            await newTicket.save()
            res.json({msg: "Ticket added Success!"})
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    editTicket: async(req, res) => {
        try {
           await Tickets.findOneAndUpdate({_id: req.params.tid}, {
               status: true
           })
           res.json({msg: "Ticket Conformed!"})
       } catch (error) {
           res.json({msg: error.message})
       }
      
   },

}
 export default ticketController;