import { Router } from "express";
import paymentController from "../controllers/paymentController.js";
import auth from "../middleware/auth.js";
import authAdmin from "../middleware/authAdmin.js";
const paymentRoute = Router();

paymentRoute.post("/api/payment",auth, paymentController.createPayment);


export default paymentRoute;