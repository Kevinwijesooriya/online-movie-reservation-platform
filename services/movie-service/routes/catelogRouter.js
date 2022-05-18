import express from "express";
const catelogRouter = express.Router();
import catelogController from '../controllers/catelogController.js'
import auth from '../middleware/auth.js'
import authAdmin from '../middleware/authAdmin.js'


catelogRouter.route('/catelog')
    .get(catelogController.getCategories)
    .post(auth, authAdmin, catelogController.createCatelog)

    catelogRouter.route('/catelog/:id')
    .delete(auth, authAdmin, catelogController.deleteCatelog)
    .put(auth, authAdmin, catelogController.updateCatelog)


export default catelogRouter;