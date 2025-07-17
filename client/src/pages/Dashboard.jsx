import React, { useState, useEffect } from 'react';
import { API } from '../api.js';
import toast from 'react-hot-toast';
import { ClipboardList, Loader2, XCircle } from 'lucide-react';

const Dashboard = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [cancelId, setCancelId] = useState(null);

    const fetchBookings = async () => {
        setLoading(true);
        try {
            const res = await API.get('/bookings');
            setBookings(res.data);
        } catch {
            toast.error('Failed to fetch bookings');
        } finally {
            setLoading(false);
        }
    };

    const cancelBooking = async (id) => {
        setCancelId(id);
        try {
            await API.delete(`/bookings/${id}`);
            toast.success('Booking cancelled');
            fetchBookings();
        } catch {
            toast.error('Failed to cancel booking');
        } finally {
            setCancelId(null);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <div className="flex items-center gap-3 mb-6">
                <div className="bg-cyan-500 p-2 rounded-full shadow ring-4 ring-cyan-300/40">
                    <ClipboardList className="w-6 h-6 text-slate-900" />
                </div>
                <h2 className="text-3xl font-extrabold text-cyan-300 tracking-tight">
                    FleetLink Dashboard
                </h2>
            </div>

            {loading ? (
                <div className="text-center text-white text-lg py-8 flex items-center justify-center gap-2">
                    <Loader2 className="animate-spin w-5 h-5 text-cyan-400" />
                    Loading bookings...
                </div>
            ) : bookings.length === 0 ? (
                <p className="text-slate-300 text-center">No bookings found.</p>
            ) : (
                <div className="grid gap-5">
                    {bookings.map(b => (
                        <div
                            key={b._id}
                            className="bg-gradient-to-br from-[#0b1e3c] via-[#183a5a] to-[#172c4c] text-white rounded-2xl border border-cyan-500/20 p-6 shadow-[0_0_16px_#00ffff33] backdrop-blur-sm space-y-2"
                        >
                            <div className="flex justify-between items-center">
                                <h3 className="text-xl font-bold text-cyan-400">
                                    📦 Vehicle ID: <span className="text-white">{b.vehicleId}</span>
                                </h3>
                            </div>

                            <p><span className="text-cyan-300 font-medium">Route:</span> {b.fromPincode} → {b.toPincode}</p>
                            <p><span className="text-cyan-300 font-medium">Start:</span> {new Date(b.startTime).toLocaleString()}</p>
                            <p><span className="text-cyan-300 font-medium">End:</span> {new Date(b.endTime).toLocaleString()}</p>
                            <p><span className="text-cyan-300 font-medium">Customer:</span> {b.customerId}</p>

                            <button
                                onClick={() => cancelBooking(b._id)}
                                disabled={cancelId === b._id}
                                className="mt-3 inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-semibold px-5 py-2 rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {cancelId === b._id ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Cancelling...
                                    </>
                                ) : (
                                    <>
                                        <XCircle className="w-4 h-4" />
                                        Cancel Booking
                                    </>
                                )}
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
