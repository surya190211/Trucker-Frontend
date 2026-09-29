import React from 'react';

export default function StopsList({ stops }) {
    if (!stops || stops.length === 0) return null;
    
    return (
        <div className="space-y-4">
            {stops.map((stop, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-center gap-4 bg-slate-900/50 p-4 rounded-xl border border-white/5">
                    <div className="flex-shrink-0 w-12 h-12 bg-cyan-900/30 text-cyan-400 font-bold rounded-full flex items-center justify-center border border-cyan-500/20">
                        {(idx + 1).toString().padStart(2, '0')}
                    </div>
                    <div className="flex-grow">
                        <div className="flex justify-between items-start">
                            <div>
                                <h4 className="text-white font-bold tracking-wide">{stop.type}</h4>
                                <p className="text-gray-400 text-sm mt-1">{stop.location || `Mile ${Math.round(stop.mileage || 0)}`}</p>
                            </div>
                            <div className="text-right">
                                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Time</span>
                                <span className="text-white text-sm">
                                    {new Date(stop.start).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} – {new Date(stop.end).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
