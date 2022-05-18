//const router = require('express').Router()
import { Router } from "express";
import theaterController from '../controllers/theaterController.js';
import auth from '../middleware/auth.js';
import authAdmin from '../middleware/authAdmin.js';
const theatersRouter = Router();


theatersRouter.route('/api/theaters')
    .get(theaterController.getTheaters)
    .post(auth, authAdmin, theaterController.createTheater)


theatersRouter.route('/api/theaters/:id')
    .delete(auth, authAdmin, theaterController.deleteTheater)
    .put(auth, authAdmin, theaterController.updateTheater)



export default theatersRouter;