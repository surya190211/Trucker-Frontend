import React, { useMemo } from 'react';

const SummaryCalculations = ({ entries }) => {
    
    const summary = useMemo(() => {
        let totals = { 1: 0, 2: 0, 3: 0, 4: 0 };
        
        entries.forEach(entry => {
            if(entry.start_time && entry.end_time) {
                const [h1, m1] = entry.start_time.split(':').map(Number);
                const [h2, m2] = entry.end_time.split(':').map(Number);
                const startDec = h1 + (m1 / 60);
                const endDec = h2 + (m2 / 60);
                
                let duration = endDec - startDec;
                if(duration < 0) duration += 24; 
                
                totals[entry.duty_status] += duration;
            }
        });

        const activeHours = totals[3] + totals[4];
        const totalHours = totals[1] + totals[2] + totals[3] + totals[4];

        return { totals, activeHours, totalHours };
    }, [entries]);

    return (
        <div className="glass-panel p-6 rounded-2xl">
            <h2 className="text-xl font-semibold text-slate-200 mb-6 flex items-center gap-2">
                <svg className="w-5 h-5 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                Summary Dashboard
            </h2>

            <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-slate-800/40 rounded-lg border border-slate-700/50">
                    <span className="text-slate-400 text-sm">Off Duty</span>
                    <span className="text-slate-200 font-bold font-mono">{summary.totals[1].toFixed(2)} <span className="text-xs font-sans text-slate-500">HRS</span></span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-800/40 rounded-lg border border-slate-700/50">
                    <span className="text-slate-400 text-sm">Sleeper Berth</span>
                    <span className="text-slate-200 font-bold font-mono">{summary.totals[2].toFixed(2)} <span className="text-xs font-sans text-slate-500">HRS</span></span>
                </div>
                <div className="flex justify-between items-center p-3 bg-cyan-900/20 rounded-lg border border-cyan-800/30">
                    <span className="text-cyan-400 text-sm">Driving</span>
                    <span className="text-cyan-300 font-bold font-mono">{summary.totals[3].toFixed(2)} <span className="text-xs font-sans text-cyan-600">HRS</span></span>
                </div>
                <div className="flex justify-between items-center p-3 bg-cyan-900/20 rounded-lg border border-cyan-800/30">
                    <span className="text-cyan-400 text-sm">On Duty (Not Driving)</span>
                    <span className="text-cyan-300 font-bold font-mono">{summary.totals[4].toFixed(2)} <span className="text-xs font-sans text-cyan-600">HRS</span></span>
                </div>
            </div>
            
            <div className="mt-8 p-5 bg-gradient-to-r from-slate-800 to-slate-800/50 rounded-xl border border-slate-700 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-3xl rounded-full"></div>
                <div className="relative z-10">
                    <div className="text-slate-400 text-sm mb-1 uppercase tracking-wider">Combined Active</div>
                    <div className="text-4xl font-bold text-white font-mono flex items-baseline gap-1">
                        {summary.activeHours.toFixed(2)} <span className="text-lg font-sans text-slate-500">HRS</span>
                    </div>
                </div>
                <div className={`mt-4 text-sm font-medium flex items-center justify-between ${summary.totalHours === 24 ? "text-emerald-400" : "text-rose-400"}`}>
                    <span>Daily Total Validation</span>
                    <span className="font-mono">{summary.totalHours.toFixed(2)} / 24.00</span>
                </div>
            </div>
        </div>
    );
};

export default SummaryCalculations;
