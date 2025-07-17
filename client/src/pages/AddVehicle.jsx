import React, { useState } from 'react';
import { API } from '../api.js';
import toast from 'react-hot-toast';
import VehicleForm from '../components/VehicleForm.jsx';

const AddVehicle = () => {
    const [form, setForm] = useState({ name: '', capacityKg: '', tyres: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await API.post('/vehicles', form);
            toast.success('Vehicle added successfully');
            setForm({ name: '', capacityKg: '', tyres: '' });
        } catch (err) {
            toast.error('Error adding vehicle');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6">
            <VehicleForm
                form={form}
                onChange={handleChange}
                onSubmit={handleSubmit}
                loading={loading}
            />
        </div>
    );
};

export default AddVehicle;
