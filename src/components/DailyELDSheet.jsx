import React from 'react';
import ELDGrid from './ELDGrid';

export default function DailyELDSheet({ day, metadata }) {
    // Compute totals directly from segments to ensure accuracy
    const calcTotal = (status) => {
        return day.segments
            .filter(s => s.status === status)
            .reduce((sum, s) => sum + (s.duration || 0), 0);
    };

    const offDuty = calcTotal('OFF DUTY');
    const sleeper = calcTotal('SLEEPER BERTH');
    const driving = calcTotal('DRIVING');
    const onDuty = calcTotal('ON DUTY');

    return (
        <div className="mb-12 bg-slate-800/30 rounded-2xl border border-white/10 p-6 md:p-8 print:bg-white print:text-black print:border-none print:p-0 print-page-break">
            {/* Header */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 pb-6 border-b border-white/10 print:border-black/20">
                <div>
                    <p className="text-gray-500 text-xs font-bold uppercase">Date</p>
                    <p className="text-white print:text-black font-semibold">{day.date}</p>
                </div>
                <div>
                    <p className="text-gray-500 text-xs font-bold uppercase">Driver</p>
                    <p className="text-white print:text-black font-semibold">{metadata?.driver || 'Trucker'}</p>
                </div>
                <div>
                    <p className="text-gray-500 text-xs font-bold uppercase">Distance</p>
                    <p className="text-white print:text-black font-semibold">{day.segments.reduce((acc, s) => acc + (s.miles || 0), 0).toFixed(0)} Miles</p>
                </div>
                <div>
                    <p className="text-gray-500 text-xs font-bold uppercase">Carrier</p>
                    <p className="text-white print:text-black font-semibold">Demo Logistics</p>
                </div>
            </div>
            
            {/* ELDGrid */}
            <div className="mb-6">
                <ELDGrid segments={day.segments} />
            </div>
            
            {/* Totals & Remarks */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h5 className="text-gray-500 text-xs font-bold uppercase mb-3">Remarks</h5>
                    <div className="h-24 bg-slate-900/50 rounded-xl border border-white/5 p-4 text-gray-400 text-sm print:bg-gray-100 print:text-black print:border-black/20">
                        {day.segments.filter(s => s.reason !== 'Padding' && s.reason !== 'Off Duty').map(s => s.reason).join(', ')}
                    </div>
                </div>
                <div>
                    <h5 className="text-gray-500 text-xs font-bold uppercase mb-3">24-Hour Totals</h5>
                    <div className="bg-slate-900/50 rounded-xl border border-white/5 p-4 grid grid-cols-2 gap-4 print:bg-gray-100 print:border-black/20 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-400 print:text-gray-600">Off Duty:</span>
                            <span className="text-white print:text-black font-bold">{offDuty.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-400 print:text-gray-600">Sleeper:</span>
                            <span className="text-white print:text-black font-bold">{sleeper.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-400 print:text-gray-600">Driving:</span>
                            <span className="text-white print:text-black font-bold">{driving.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-400 print:text-gray-600">On Duty:</span>
                            <span className="text-white print:text-black font-bold">{onDuty.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
