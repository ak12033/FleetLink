import Vehicle from '../models/Vehicle.js';

export const addVehicle = async (req, res) => {
    try {
        const { name, capacityKg, tyres } = req.body;

        if (!name || !capacityKg || !tyres) {
            return res.status(400).json({ msg: 'All fields are required.' });
        }

        const vehicle = new Vehicle({ name, capacityKg, tyres });
        await vehicle.save();
        res.status(201).json(vehicle);
    } catch (error) {
        res.status(500).json({ msg: 'Server error.' });
    }
};