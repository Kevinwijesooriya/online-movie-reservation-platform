import { Router } from "express";
import locationController from '../controllers/locationController.js';
import auth from '../middleware/auth.js';
import authAdmin from '../middleware/authAdmin.js';
const locationsRouter = Router();

locationsRouter.route('/api/location')
    .get(locationController.getLocations)
    .post(auth, authAdmin, locationController.createLocation)

    locationsRouter.route('/api/location/:id')
    .delete(auth, authAdmin, locationController.deleteLocation)
    .put(auth, authAdmin, locationController.updateLocation)

export default locationsRouter;