import React, { useState, useEffect } from 'react';
import { getTrucks, createTruck } from '../services/api';

export default function Trucks() {
    const [trucks, setTrucks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ truck_number: '', make: '', model: '', year: '', vin: '', current_mileage: 0, status: 'Available' });

    useEffect(() => {
        fetchTrucks();
    }, []);

    const fetchTrucks = async () => {
        try {
            const res = await getTrucks();
            setTrucks(res.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createTruck(formData);
            fetchTrucks();
            setShowForm(false);
            setFormData({ truck_number: '', make: '', model: '', year: '', vin: '', current_mileage: 0, status: 'Available' });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="p-8 w-full min-h-full text-white">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-black tracking-tight text-white/90">Fleet Assets</h1>
                <button onClick={() => setShowForm(!showForm)} className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold py-2 px-6 rounded-xl transition-all shadow-lg shadow-cyan-500/20">
                    {showForm ? 'Cancel' : '+ Add Truck'}
                </button>
            </div>

            {showForm && (
                <div className="mb-8 p-6 bg-slate-800/80 rounded-2xl border border-white/10 backdrop-blur-md shadow-2xl">
                    <h2 className="text-xl font-bold mb-4 text-cyan-400">Register New Asset</h2>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <input required placeholder="Truck Number / ID" className="bg-slate-900/50 border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors" onChange={e => setFormData({...formData, truck_number: e.target.value})} value={formData.truck_number} />
                        <input placeholder="Make (e.g. Peterbilt)" className="bg-slate-900/50 border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors" onChange={e => setFormData({...formData, make: e.target.value})} value={formData.make} />
                        <input placeholder="Model" className="bg-slate-900/50 border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors" onChange={e => setFormData({...formData, model: e.target.value})} value={formData.model} />
                        <input placeholder="Year" type="number" className="bg-slate-900/50 border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors" onChange={e => setFormData({...formData, year: e.target.value})} value={formData.year} />
                        <input placeholder="VIN" className="bg-slate-900/50 border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors" onChange={e => setFormData({...formData, vin: e.target.value})} value={formData.vin} />
                        <input placeholder="Current Mileage" type="number" className="bg-slate-900/50 border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors" onChange={e => setFormData({...formData, current_mileage: e.target.value})} value={formData.current_mileage} />
                        <select className="bg-slate-900/50 border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors" onChange={e => setFormData({...formData, status: e.target.value})} value={formData.status}>
                            <option>Available</option>
                            <option>In Use</option>
                            <option>Maintenance</option>
                            <option>Inactive</option>
                        </select>
                        <div className="md:col-span-2 flex justify-end">
                            <button type="submit" className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-cyan-500/20">Save Asset</button>
                        </div>
                    </form>
                </div>
            )}

            {loading ? (
                <div className="text-cyan-400 font-bold animate-pulse">Loading Fleet...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {trucks.map(truck => (
                        <div key={truck.id} className="p-6 bg-slate-800/40 hover:bg-slate-800/60 transition-colors rounded-2xl border border-white/5 backdrop-blur-md group relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl group-hover:bg-cyan-500/10 transition-colors pointer-events-none"></div>
                            <div className="flex justify-between items-start mb-6 relative z-10">
                                <div>
                                    <h3 className="text-2xl font-black text-white group-hover:text-cyan-400 transition-colors tracking-tight">{truck.truck_number}</h3>
                                    <p className="text-gray-400 text-sm font-medium uppercase tracking-widest mt-1">{truck.year} {truck.make} {truck.model}</p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${truck.status === 'Available' ? 'bg-green-500/20 text-green-400 border border-green-500/20' : truck.status === 'In Use' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/20' : truck.status === 'Maintenance' ? 'bg-red-500/20 text-red-400 border border-red-500/20' : 'bg-slate-500/20 text-slate-400 border border-slate-500/20'}`}>
                                    {truck.status}
                                </span>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm relative z-10">
                                <div className="bg-slate-900/50 p-3 rounded-xl border border-white/5">
                                    <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Mileage</p>
                                    <p className="text-white font-medium">{truck.current_mileage.toLocaleString()} mi</p>
                                </div>
                                <div className="bg-slate-900/50 p-3 rounded-xl border border-white/5">
                                    <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">VIN</p>
                                    <p className="text-white font-medium truncate" title={truck.vin}>{truck.vin || 'N/A'}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                    {trucks.length === 0 && <div className="col-span-full text-gray-400 italic">No fleet assets found. Add one above.</div>}
                </div>
            )}
        </div>
    );
}
