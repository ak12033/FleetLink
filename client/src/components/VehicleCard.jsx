import React from 'react';
import { Truck, Loader2 } from 'lucide-react';

const VehicleCard = ({ vehicle, onBook, isBooking, isUnavailable }) => {
    return (
        <div className="relative group bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white p-8 rounded-3xl shadow-2xl border border-cyan-400/30 backdrop-blur-md overflow-hidden transition-transform hover:scale-[1.015] hover:shadow-cyan-500/30 duration-300">
            <div className="absolute -top-10 -left-10 w-52 h-52 bg-cyan-400/20 blur-3xl rounded-full z-0 animate-pulse" />

            <div className="absolute -top-0 right-30 z-0 opacity-10">
                <Truck size={180} className="text-white" />
            </div>

            <div className="relative z-10">
                <h3 className="text-3xl font-extrabold text-cyan-300 mb-4 tracking-wide group-hover:underline underline-offset-4 decoration-cyan-500">
                    {vehicle.name}
                </h3>

                <div className="space-y-2 text-sm text-cyan-100 leading-relaxed">
                    <p><span className="text-cyan-400 font-semibold">📦 Capacity:</span> {vehicle.capacityKg} kg</p>
                    <p><span className="text-cyan-400 font-semibold">🛞 Tyres:</span> {vehicle.tyres}</p>
                    <p><span className="text-cyan-400 font-semibold">⏱ Duration:</span> {vehicle.estimatedRideDurationHours} hrs</p>
                </div>

                <div className="pt-6">
                    <button
                        onClick={() => onBook(vehicle._id)}
                        disabled={isBooking || isUnavailable}
                        className="w-full bg-gradient-to-r from-cyan-400 to-cyan-600 hover:from-cyan-500 hover:to-cyan-700 text-slate-900 font-bold py-3 px-6 rounded-xl shadow-md hover:shadow-cyan-500/40 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isBooking ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Booking...
                            </>
                        ) : isUnavailable ? (
                            <>❌ Not Available</>
                        ) : (
                            <>🚀 Book Now</>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VehicleCard;
