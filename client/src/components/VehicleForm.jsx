import React from 'react';
import { Truck, Loader2 } from 'lucide-react';

const VehicleForm = ({ form, onChange, onSubmit, loading }) => {
    return (
        <form
            onSubmit={onSubmit}
            className="relative bg-gradient-to-br from-[#092151] via-[#265692] to-slate-700 border border-cyan-500/30 backdrop-blur-xl bg-opacity-60 p-8 rounded-3xl shadow-[0_0_20px_#00ffff33] max-w-xl mx-auto text-white space-y-6 transition-all duration-300"
        >
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-cyan-500 p-3 rounded-full shadow-lg ring-4 ring-cyan-400 animate-pulse">
                <Truck className="w-6 h-6 text-slate-900" />
            </div>

            <h2 className="text-3xl font-bold text-center text-cyan-300 tracking-wide">
                ➕ Add New Vehicle
            </h2>

            {[
                { name: 'name', type: 'text', placeholder: 'e.g. Tata Ace', label: 'Vehicle Name' },
                { name: 'capacityKg', type: 'number', placeholder: 'e.g. 1200', label: 'Capacity (kg)' },
                { name: 'tyres', type: 'number', placeholder: 'e.g. 4', label: 'Tyres' },
            ].map(({ name, type, placeholder, label }) => (
                <div key={name}>
                    <label className="block text-sm font-semibold text-cyan-200 mb-1">{label}</label>
                    <input
                        name={name}
                        type={type}
                        placeholder={placeholder}
                        value={form[name]}
                        onChange={onChange}
                        className="w-full p-3 rounded-xl border border-cyan-500 bg-[#172c5e] text-white placeholder-slate-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:shadow-[0_0_10px_#00ffff99]"
                        required
                    />
                </div>
            ))}

            <div className="pt-2">
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:from-cyan-500 hover:to-cyan-700 text-slate-900 font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-cyan-500/40 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Adding Vehicle...
                        </>
                    ) : (
                        <>🚀 Add Vehicle</>
                    )}
                </button>
            </div>
        </form>
    );
};

export default VehicleForm;
