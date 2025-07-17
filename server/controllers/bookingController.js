import Vehicle from '../models/Vehicle.js';
import Booking from '../models/Booking.js';
import calculateRideDuration from '../utils/rideDuration.js';

export const getAvailableVehicles = async (req, res) => {
    const { capacityRequired, fromPincode, toPincode, startTime } = req.query;

    try {
        const rideDuration = calculateRideDuration(fromPincode, toPincode);
        const start = new Date(startTime);
        const end = new Date(start.getTime() + rideDuration * 60 * 60 * 1000);

        const candidates = await Vehicle.find({ capacityKg: { $gte: capacityRequired } });
        const availableVehicles = [];

        for (let vehicle of candidates) {
            const conflict = await Booking.findOne({
                vehicleId: vehicle._id,
                $or: [
                    { startTime: { $lt: end }, endTime: { $gt: start } }
                ]
            });

            if (!conflict) {
                availableVehicles.push({
                    ...vehicle._doc,
                    estimatedRideDurationHours: rideDuration
                });
            }
        }

        res.status(200).json(availableVehicles);
    } catch (error) {
        res.status(500).json({ msg: 'Server error.' });
    }
};

export const bookVehicle = async (req, res) => {
    const { vehicleId, fromPincode, toPincode, startTime, customerId } = req.body;

    try {
        const vehicle = await Vehicle.findById(vehicleId);
        if (!vehicle) return res.status(404).json({ msg: 'Vehicle not found' });

        const rideDuration = calculateRideDuration(fromPincode, toPincode);
        const start = new Date(startTime);
        const end = new Date(start.getTime() + rideDuration * 60 * 60 * 1000);

        const conflict = await Booking.findOne({
            vehicleId,
            $or: [
                { startTime: { $lt: end }, endTime: { $gt: start } }
            ]
        });

        if (conflict) return res.status(409).json({ msg: 'Vehicle already booked during this time' });

        const booking = new Booking({
            vehicleId,
            fromPincode,
            toPincode,
            startTime: start,
            endTime: end,
            customerId
        });

        await booking.save();
        res.status(201).json(booking);
    } catch (error) {
        res.status(500).json({ msg: 'Server error.' });
    }
};

export const getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().sort({ startTime: -1 });
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
}

export const deleteBooking = async (req, res) => {
    try {
        await Booking.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Booking deleted' });
    } catch {
        res.status(500).json({ msg: 'Failed to delete booking' });
    }
}
