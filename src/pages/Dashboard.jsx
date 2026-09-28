import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Dashboard() {
    const [hosData, setHosData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHOS = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/hos/');
                setHosData(response.data.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError('Failed to load compliance data from server.');
                setLoading(false);
            }
        };
        fetchHOS();
    }, []);

    if (loading) return (
        <div className="p-8 w-full h-full flex items-center justify-center">
            <div className="text-cyan-400 text-xl font-bold animate-pulse tracking-widest">CONNECTING TO HOS ENGINE...</div>
        </div>
    );
    
    if (error) return (
        <div className="p-8 w-full h-full">
            <div className="p-6 bg-red-900/30 rounded-2xl border border-red-500/20 text-red-400 font-bold">{error}</div>
        </div>
    );
    
    if (!hosData) return <div className="p-8 text-white font-medium">No logs available to calculate HOS. Go to Logbook to create an entry.</div>;

    return (
        <div className="p-8 w-full h-full text-white">
            <h1 className="text-4xl font-black mb-8 tracking-tight text-white/90">System Dashboard</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="p-6 bg-slate-800/50 rounded-2xl border border-white/5 backdrop-blur-md relative overflow-hidden group">
                    <div className={`absolute inset-0 bg-gradient-to-br ${hosData.is_compliant ? 'from-green-500/10' : 'from-red-500/20'} to-transparent opacity-50`}></div>
                    <p className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-2 relative z-10">Driver Status</p>
                    <p className={`text-3xl font-black relative z-10 ${hosData.is_compliant ? 'text-green-400' : 'text-red-400'}`}>
                        {hosData.is_compliant ? "COMPLIANT" : "VIOLATION"}
                    </p>
                </div>
                <div className="p-6 bg-slate-800/50 rounded-2xl border border-white/5 backdrop-blur-md">
                    <p className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-2">Driving Left</p>
                    <p className="text-3xl font-black text-white">{hosData.driving_remaining} <span className="text-lg text-gray-500">hrs</span></p>
                </div>
                <div className="p-6 bg-slate-800/50 rounded-2xl border border-white/5 backdrop-blur-md">
                    <p className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-2">On-Duty Left</p>
                    <p className="text-3xl font-black text-white">{hosData.on_duty_remaining} <span className="text-lg text-gray-500">hrs</span></p>
                </div>
                <div className="p-6 bg-slate-800/50 rounded-2xl border border-white/5 backdrop-blur-md">
                    <p className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-2">Logged Today</p>
                    <p className="text-3xl font-black text-cyan-400">{(hosData.driving_hours + hosData.on_duty_hours).toFixed(2)} <span className="text-lg text-cyan-700">hrs</span></p>
                </div>
            </div>

            {hosData.violations.length > 0 && (
                <div className="p-6 bg-red-900/30 rounded-2xl border border-red-500/20 mb-8 backdrop-blur-md">
                    <h2 className="text-red-400 font-bold mb-3 uppercase tracking-widest text-sm">Active Violations</h2>
                    <ul className="list-disc pl-5 text-red-200 font-medium">
                        {hosData.violations.map((v, i) => <li key={i}>{v}</li>)}
                    </ul>
                </div>
            )}
            
            <div className="p-8 bg-slate-800/50 rounded-2xl border border-white/5 backdrop-blur-md">
                <h2 className="text-2xl font-bold mb-4">Latest Processed Log ({hosData.date})</h2>
                <div className="flex gap-8">
                    <p className="text-gray-400">Driver: <span className="text-white font-medium ml-2">{hosData.driver}</span></p>
                    <p className="text-gray-400">Driving: <span className="text-white font-medium ml-2">{hosData.driving_hours} hrs</span></p>
                    <p className="text-gray-400">Sleeper: <span className="text-white font-medium ml-2">{hosData.sleeper_hours} hrs</span></p>
                </div>
            </div>
        </div>
    );
}
