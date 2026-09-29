import React, { useState } from 'react';
import { planTrip } from '../services/api';
import TripMap from '../components/TripMap';
import StopsList from '../components/StopsList';
import DailyELDSheet from '../components/DailyELDSheet';

export default function Trips() {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ current_location: '', pickup_location: '', dropoff_location: '', current_cycle_hours: 0 });
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await planTrip(formData);
            setResult(res.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setError('Unable to calculate this route. Please check the location names and try again.');
            setLoading(false);
        }
    };

    return (
        <div className="p-8 w-full min-h-full text-white">
            <h1 className="text-4xl font-black mb-8 tracking-tight text-white/90">Trip Planner</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 p-6 bg-slate-800/50 rounded-2xl border border-white/5 backdrop-blur-md self-start sticky top-8">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm font-semibold">
                                {error}
                            </div>
                        )}
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
                        <div className="space-y-12">
                            {/* 1. Trip Summary */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="p-6 bg-slate-800/50 rounded-2xl border border-white/5 text-center hover:bg-slate-800/70 transition-colors">
                                    <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Total Distance</p>
                                    <p className="text-2xl font-black text-white">{Math.round(result.trip.distance_miles)} mi</p>
                                </div>
                                <div className="p-6 bg-slate-800/50 rounded-2xl border border-white/5 text-center hover:bg-slate-800/70 transition-colors">
                                    <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Total Days</p>
                                    <p className="text-2xl font-black text-white">{result.summary.days}</p>
                                </div>
                                <div className="p-6 bg-slate-800/50 rounded-2xl border border-white/5 text-center hover:bg-slate-800/70 transition-colors">
                                    <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Total Driving</p>
                                    <p className="text-2xl font-black text-cyan-400">{(result.summary.driving_hours).toFixed(1)}h</p>
                                </div>
                                <div className="p-6 bg-slate-800/50 rounded-2xl border border-white/5 text-center hover:bg-slate-800/70 transition-colors">
                                    <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Total Duty</p>
                                    <p className="text-2xl font-black text-amber-400">{(result.summary.on_duty_hours).toFixed(1)}h</p>
                                </div>
                                <div className="p-6 bg-slate-800/50 rounded-2xl border border-white/5 text-center hover:bg-slate-800/70 transition-colors">
                                    <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Sleeper Berth</p>
                                    <p className="text-2xl font-black text-purple-400">{(result.summary.sleeper_hours).toFixed(1)}h</p>
                                </div>
                                <div className="p-6 bg-slate-800/50 rounded-2xl border border-white/5 text-center hover:bg-slate-800/70 transition-colors">
                                    <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Cycle Remaining</p>
                                    <p className="text-2xl font-black text-green-400">{(result.summary.cycle_hours_remaining).toFixed(1)}h</p>
                                </div>
                                <div className="p-6 bg-slate-800/50 rounded-2xl border border-white/5 text-center hover:bg-slate-800/70 transition-colors">
                                    <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Fuel Stops</p>
                                    <p className="text-2xl font-black text-white">{result.summary.fuel_stops}</p>
                                </div>
                                <div className="p-6 bg-slate-800/50 rounded-2xl border border-white/5 text-center hover:bg-slate-800/70 transition-colors">
                                    <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Rest Stops</p>
                                    <p className="text-2xl font-black text-white">{result.summary.rest_stops}</p>
                                </div>
                            </div>

                            {/* 2. Map */}
                            <div className="bg-slate-800/50 rounded-2xl border border-white/5 overflow-hidden">
                                <div className="p-4 border-b border-white/5 bg-slate-900/30">
                                    <h3 className="text-xl font-bold tracking-tight text-cyan-400">Route Map</h3>
                                </div>
                                <TripMap routeGeometry={result.route?.geometry} waypoints={result.route?.waypoints} />
                            </div>
                            
                            {/* 3. Planned Stops */}
                            <div className="bg-slate-800/50 rounded-2xl border border-white/5 overflow-hidden">
                                <div className="p-4 border-b border-white/5 bg-slate-900/30">
                                    <h3 className="text-xl font-bold tracking-tight text-cyan-400">Planned Stops</h3>
                                </div>
                                <div className="p-6">
                                    <StopsList stops={result.stops} />
                                </div>
                            </div>
                            
                            {/* 4. Daily ELD Logs */}
                            <div>
                                <h3 className="text-2xl font-black mb-6 tracking-tight text-white/90">Daily ELD Logs</h3>
                                {result.days.map((day, i) => (
                                    <DailyELDSheet key={day.date || i} day={day} metadata={{driver: 'Driver Name'}} />
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-[600px] bg-slate-800/20 rounded-2xl border border-dashed border-white/10 text-gray-500 font-medium text-lg">
                            Enter trip details to generate a comprehensive HOS plan.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
