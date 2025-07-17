import express from 'express'
import { bookVehicle, deleteBooking, getBookings } from '../controllers/bookingController.js';

const bookingRouter = express.Router()

bookingRouter.post('/bookings', bookVehicle);
bookingRouter.get('/bookings', getBookings);
bookingRouter.delete('/bookings/:id', deleteBooking)

export default bookingRouter;