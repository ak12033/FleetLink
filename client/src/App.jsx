import React from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import SearchAndBook from './pages/SearchAndBook';
import AddVehicle from './pages/AddVehicle';
import Dashboard from './pages/Dashboard';

const App = () => {
    const location = useLocation();

    const navItems = [
        { name: 'Search & Book', path: '/' },
        { name: 'Add Vehicle', path: '/add-vehicle' },
        { name: 'Dashboard', path: '/dashboard' },
    ];

    return (
        <div className="min-h-screen bg-[url('/bg.jpg')] bg-cover bg-center text-white font-sans">
            {/* Navbar */}
            <nav className="bg-gradient-to-r from-cyan-700 to-cyan-900 shadow-lg py-4 px-6 flex flex-col md:flex-row items-center justify-between via-transparent">
                <h1 className="text-2xl font-extrabold tracking-wide text-white mb-2 md:mb-0">🚚 FleetLink</h1>
                <div className="flex space-x-4">
                    {navItems.map(({ name, path }) => (
                        <Link
                            key={name}
                            to={path}
                            className={`px-4 py-2 rounded-md font-medium transition duration-200 ${location.pathname === path
                                    ? 'bg-white text-cyan-800 shadow-inner'
                                    : 'text-white hover:bg-white/20'
                                }`}
                        >
                            {name}
                        </Link>
                    ))}
                </div>
            </nav>

            {/* Routes */}
            <main className="px-4 py-6">
                <Routes>
                    <Route path="/" element={<SearchAndBook />} />
                    <Route path="/add-vehicle" element={<AddVehicle />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </main>
        </div>
    );
};

export default App;
