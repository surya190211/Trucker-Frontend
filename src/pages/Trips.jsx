import React, { useState } from 'react';
import api from '../services/api';
import ELDGrid from '../components/ELDGrid';

export default function Trips() {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ current_location: '', pickup_location: '', dropoff_location: '', current_cycle_hours: 0 });
    const [result, setResult] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await api.post('/trips/plan/', formData);
            setResult(res.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    return (
        <div className="p-8 w-full min-h-full text-white">
            <h1 className="text-4xl font-black mb-8 tracking-tight text-white/90">Trip Planner</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 p-6 bg-slate-800/50 rounded-2xl border border-white/5 backdrop-blur-md">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div>
                            <label className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-2 block">Current Location</label>
                            <input required className="w-full bg-slate-900/50 border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500" onChange={e => setFormData({...formData, current_location: e.target.value})} />
                        </div>
                        <div>
                            <label className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-2 block">Pickup Location</label>
                            <input required className="w-full bg-slate-900/50 border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500" onChange={e => setFormData({...formData, pickup_location: e.target.value})} />
                        </div>
                        <div>
                            <label className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-2 block">Dropoff Location</label>
                            <input required className="w-full bg-slate-900/50 border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500" onChange={e => setFormData({...formData, dropoff_location: e.target.value})} />
                        </div>
                        <div>
                            <label className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-2 block">Current Cycle Used (Hours)</label>
                            <input type="number" required min="0" max="70" className="w-full bg-slate-900/50 border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500" onChange={e => setFormData({...formData, current_cycle_hours: e.target.value})} />
                        </div>
                        <button type="submit" className="mt-4 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-cyan-500/20 w-full">
                            {loading ? 'CALCULATING...' : 'PLAN MY TRIP'}
                        </button>
                    </form>
                </div>
                
                <div className="lg:col-span-2">
                    {result ? (
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="p-4 bg-slate-800/50 rounded-xl border border-white/5">
                                    <p className="text-gray-500 text-xs font-bold uppercase">Distance</p>
                                    <p className="text-xl font-bold text-white">{Math.round(result.trip.distance_miles)} mi</p>
                                </div>
                                <div className="p-4 bg-slate-800/50 rounded-xl border border-white/5">
                                    <p className="text-gray-500 text-xs font-bold uppercase">Est. Travel</p>
                                    <p className="text-xl font-bold text-white">{Math.round(result.trip.estimated_duration_hours)} hrs</p>
                                </div>
                            </div>
                            
                            <div className="p-6 bg-slate-800/50 rounded-2xl border border-white/5">
                                
                                <h3 className="text-xl font-bold mb-4 text-cyan-400">Generated ELD Schedule</h3>
                                {result.days.map((day, i) => (
                                    <div key={i} className="mb-8 last:mb-0">
                                        <h4 className="text-lg font-bold mb-3 border-b border-white/10 pb-2 flex justify-between">
                                            <span>{day.date}</span>
                                            <span className="text-gray-500 text-sm">{day.segments.reduce((acc, s) => acc + (s.miles || 0), 0).toFixed(0)} Miles</span>
                                        </h4>
                                        <ELDGrid segments={day.segments} />
                                    </div>
                                ))}
</div>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-full bg-slate-800/20 rounded-2xl border border-dashed border-white/10 text-gray-500">
                            Enter trip details to generate HOS schedule.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
