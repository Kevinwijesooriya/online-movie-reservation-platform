import { Router } from "express";
import ticketController from "../controllers/ticketController.js";
import auth from "../middleware/auth.js";
import authAdmin from "../middleware/authAdmin.js";
const ticketRoute = Router();

ticketRoute.get('/api/tickets', ticketController.getTickets);
ticketRoute.get('/api/mytickets/:id', ticketController.getMyTickets);
ticketRoute.post('/api/ticket',auth, ticketController.createTicket);
ticketRoute.put('/api/ticket/:tid',auth,authAdmin, ticketController.editTicket);



export default ticketRoute