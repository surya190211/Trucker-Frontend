import React, { useState, useEffect } from 'react';
import { getDrivers, createDriver } from '../services/api';

export default function Drivers() {
    const [drivers, setDrivers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ driver_id: '', full_name: '', phone: '', email: '', license_number: '', status: 'Available' });

    useEffect(() => {
        fetchDrivers();
    }, []);

    const fetchDrivers = async () => {
        try {
            const res = await getDrivers();
            setDrivers(res.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createDriver(formData);
            fetchDrivers();
            setShowForm(false);
            setFormData({ driver_id: '', full_name: '', phone: '', email: '', license_number: '', status: 'Available' });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="p-8 w-full min-h-full text-white">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-black tracking-tight text-white/90">Driver Management</h1>
                <button onClick={() => setShowForm(!showForm)} className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold py-2 px-6 rounded-xl transition-all shadow-lg shadow-cyan-500/20">
                    {showForm ? 'Cancel' : '+ Add Driver'}
                </button>
            </div>

            {showForm && (
                <div className="mb-8 p-6 bg-slate-800/80 rounded-2xl border border-white/10 backdrop-blur-md shadow-2xl">
                    <h2 className="text-xl font-bold mb-4 text-cyan-400">Register New Driver</h2>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <input required placeholder="Driver ID" className="bg-slate-900/50 border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors" onChange={e => setFormData({...formData, driver_id: e.target.value})} value={formData.driver_id} />
                        <input required placeholder="Full Name" className="bg-slate-900/50 border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors" onChange={e => setFormData({...formData, full_name: e.target.value})} value={formData.full_name} />
                        <input placeholder="Phone Number" className="bg-slate-900/50 border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors" onChange={e => setFormData({...formData, phone: e.target.value})} value={formData.phone} />
                        <input placeholder="Email Address" type="email" className="bg-slate-900/50 border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors" onChange={e => setFormData({...formData, email: e.target.value})} value={formData.email} />
                        <input placeholder="License Number" className="bg-slate-900/50 border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors" onChange={e => setFormData({...formData, license_number: e.target.value})} value={formData.license_number} />
                        <select className="bg-slate-900/50 border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors" onChange={e => setFormData({...formData, status: e.target.value})} value={formData.status}>
                            <option>Available</option>
                            <option>Driving</option>
                            <option>Off Duty</option>
                            <option>Inactive</option>
                        </select>
                        <div className="md:col-span-3 flex justify-end">
                            <button type="submit" className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-cyan-500/20">Save Driver</button>
                        </div>
                    </form>
                </div>
            )}

            {loading ? (
                <div className="text-cyan-400 font-bold animate-pulse">Loading Drivers...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {drivers.map(driver => (
                        <div key={driver.id} className="p-6 bg-slate-800/40 hover:bg-slate-800/60 transition-colors rounded-2xl border border-white/5 backdrop-blur-md group">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">{driver.full_name}</h3>
                                    <p className="text-gray-400 text-sm font-medium">ID: {driver.driver_id}</p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${driver.status === 'Available' ? 'bg-green-500/20 text-green-400 border border-green-500/20' : driver.status === 'Driving' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/20' : 'bg-slate-500/20 text-slate-400 border border-slate-500/20'}`}>
                                    {driver.status}
                                </span>
                            </div>
                            <div className="space-y-2 text-sm">
                                <p className="text-gray-400 flex items-center gap-2"><span className="text-slate-500">📞</span> {driver.phone || 'N/A'}</p>
                                <p className="text-gray-400 flex items-center gap-2"><span className="text-slate-500">✉️</span> {driver.email || 'N/A'}</p>
                                <p className="text-gray-400 flex items-center gap-2"><span className="text-slate-500">🪪</span> {driver.license_number || 'N/A'}</p>
                            </div>
                        </div>
                    ))}
                    {drivers.length === 0 && <div className="col-span-full text-gray-400 italic">No drivers found. Add one above.</div>}
                </div>
            )}
        </div>
    );
}
