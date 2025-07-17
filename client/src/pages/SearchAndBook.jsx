import React, { useState } from 'react';
import { API } from '../api.js';
import VehicleCard from '../components/VehicleCard.jsx';
import SearchForm from '../components/SearchForm.jsx';
import toast from 'react-hot-toast';

const SearchAndBook = () => {
    const [form, setForm] = useState({
        capacityRequired: '',
        fromPincode: '',
        toPincode: '',
        startTime: ''
    });

    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [bookingId, setBookingId] = useState(null);
    const [unavailableVehicles, setUnavailableVehicles] = useState(new Set()); // <-- NEW

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const handleSearch = async (searchData) => {
        setLoading(true);
        setUnavailableVehicles(new Set()); // reset unavailable state
        try {
            const res = await API.get('/vehicles/available', { params: searchData });
            setForm(searchData);
            setResults(res.data);
            setCurrentPage(1);
            toast.success('Available vehicles fetched!');
        } catch {
            toast.error('Error fetching vehicles');
        } finally {
            setLoading(false);
        }
    };

    const handleBook = async (vehicleId) => {
        setBookingId(vehicleId);
        try {
            await API.post('/bookings', {
                vehicleId,
                fromPincode: form.fromPincode,
                toPincode: form.toPincode,
                startTime: form.startTime,
                customerId: 'customer-123'
            });
            toast.success('Vehicle booked successfully');
        } catch (err) {
            if (err.response?.status === 409) {
                toast.error('Vehicle is already booked at this time');
                setUnavailableVehicles(prev => new Set(prev).add(vehicleId)); // mark as unavailable
            } else {
                toast.error('Booking failed');
            }
        } finally {
            setBookingId(null);
        }
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = results.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(results.length / itemsPerPage);

    return (
        <div className="max-w-4xl mx-auto p-4">
            <SearchForm onSearch={handleSearch} loading={loading} />

            {!loading && results.length > 0 && (
                <div className="space-y-4 mt-6">
                    <h3 className="text-lg font-semibold mb-2 text-white">Available Vehicles</h3>

                    {currentItems.map(vehicle => (
                        <VehicleCard
                            key={vehicle._id}
                            vehicle={vehicle}
                            onBook={handleBook}
                            isBooking={bookingId === vehicle._id}
                            isUnavailable={unavailableVehicles.has(vehicle._id)} // <-- NEW PROP
                        />
                    ))}

                    <div className="flex justify-center items-center space-x-4 mt-4">
                        <button
                            className="px-4 py-2 bg-blue-400 rounded hover:bg-blue-500"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(prev => prev - 1)}
                        >
                            Previous
                        </button>
                        <span className="text-sm text-white">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            className="px-4 py-2 bg-blue-400 rounded hover:bg-blue-500"
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(prev => prev + 1)}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchAndBook;
