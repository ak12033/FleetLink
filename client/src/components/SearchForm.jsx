import React, { useState } from 'react';
import { CarFront, Loader2 } from 'lucide-react';

const SearchForm = ({ onSearch, loading }) => {
    const [form, setForm] = useState({
        capacityRequired: '',
        fromPincode: '',
        toPincode: '',
        startTime: '',
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(form);
    };

    return (
        <section className="w-full max-w-5xl mx-auto bg-gradient-to-br from-[#092151] via-[#265692] to-slate-700 p-8 rounded-3xl shadow-[0_0_20px_#00ffff33] border border-cyan-400/20 backdrop-blur-md text-white transition-all duration-300">
            <div className="flex items-center justify-center mb-6">
                <div className="bg-cyan-500 p-3 rounded-full shadow-lg ring-4 ring-cyan-300/30 animate-pulse">
                    <CarFront className="w-7 h-7 text-slate-900" />
                </div>
            </div>

            <div className="text-center mb-6">
                <h2 className="text-3xl font-extrabold text-cyan-300 tracking-tight">
                    Book a Logistics Vehicle
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                    Search by capacity, route, and time.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                    { label: 'Capacity Required (Kg)', name: 'capacityRequired', type: 'number', placeholder: 'e.g. 1200' },
                    { label: 'From Pincode', name: 'fromPincode', type: 'text', placeholder: 'e.g. 400001' },
                    { label: 'To Pincode', name: 'toPincode', type: 'text', placeholder: 'e.g. 400020' },
                    { label: 'Start Time', name: 'startTime', type: 'datetime-local', placeholder: '', extraClass: 'calendar-white' },
                ].map(({ label, name, type, placeholder, extraClass }) => (
                    <div key={name}>
                        <label className="block text-sm font-medium text-cyan-200 mb-1">{label}</label>
                        <input
                            type={type}
                            name={name}
                            value={form[name]}
                            onChange={handleChange}
                            placeholder={placeholder}
                            className={`w-full p-3 bg-[#172c5e] text-white placeholder-slate-400 border border-cyan-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-300 ${extraClass || ''}`}
                            required
                        />
                    </div>
                ))}

                <div className="md:col-span-2 text-right pt-2">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center justify-center gap-2 w-full md:w-auto bg-gradient-to-r from-cyan-400 to-cyan-600 hover:from-cyan-500 hover:to-cyan-700 text-slate-900 font-bold px-8 py-3 rounded-xl shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Searching...
                            </>
                        ) : (
                            <>🔍 Search Vehicles</>
                        )}
                    </button>
                </div>
            </form>
        </section>
    );
};

export default SearchForm;
