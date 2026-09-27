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
        <div className="bg-blue-50 p-4 rounded-md shadow-sm border border-blue-100">
            <h3 className="text-lg font-bold mb-3 text-blue-900">Summary Dashboard</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="bg-white p-2 rounded shadow text-center">
                    <p className="text-xs text-gray-500">Off Duty</p>
                    <p className="font-bold">{summary.totals[1].toFixed(2)} hrs</p>
                </div>
                <div className="bg-white p-2 rounded shadow text-center">
                    <p className="text-xs text-gray-500">Sleeper Berth</p>
                    <p className="font-bold">{summary.totals[2].toFixed(2)} hrs</p>
                </div>
                <div className="bg-white p-2 rounded shadow text-center">
                    <p className="text-xs text-gray-500">Driving</p>
                    <p className="font-bold">{summary.totals[3].toFixed(2)} hrs</p>
                </div>
                <div className="bg-white p-2 rounded shadow text-center">
                    <p className="text-xs text-gray-500">On Duty (Not Driving)</p>
                    <p className="font-bold">{summary.totals[4].toFixed(2)} hrs</p>
                </div>
            </div>
            
            <div className="flex justify-between items-center bg-blue-600 text-white p-3 rounded">
                <div>
                    <span className="font-bold">Combined Active (Driving + On Duty): </span>
                    <span className="text-xl ml-2">{summary.activeHours.toFixed(2)} hrs</span>
                </div>
                <div className={summary.totalHours === 24 ? "text-green-300" : "text-red-300"}>
                    Total: {summary.totalHours.toFixed(2)} / 24.00 hrs
                </div>
            </div>
        </div>
    );
};

export default SummaryCalculations;
