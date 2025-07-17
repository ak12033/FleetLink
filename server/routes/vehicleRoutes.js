import express from 'express'
import { addVehicle } from '../controllers/vehicleController.js';
import { getAvailableVehicles } from '../controllers/bookingController.js';

const vehicleRouter = express.Router();

vehicleRouter.post('/vehicles', addVehicle);
vehicleRouter.get('/vehicles/available', getAvailableVehicles);

export default vehicleRouter;