import React, { useState } from 'react';

const LogGrid = ({ entries, setEntries }) => {
    const statuses = [
        { id: 1, label: 'Off Duty' },
        { id: 2, label: 'Sleeper Berth' },
        { id: 3, label: 'Driving' },
        { id: 4, label: 'On Duty' },
    ];

    const [currentEntry, setCurrentEntry] = useState({ start_time: '', end_time: '', duty_status: 1, location: '', remarks: '' });

    const handleAddEntry = () => {
        if(!currentEntry.start_time || !currentEntry.end_time || !currentEntry.location) {
            alert('Please fill out start time, end time, and location.');
            return;
        }
        setEntries([...entries, currentEntry].sort((a,b) => a.start_time.localeCompare(b.start_time)));
        setCurrentEntry({ start_time: '', end_time: '', duty_status: 1, location: '', remarks: '' });
    };

    const removeEntry = (index) => {
        const newEntries = [...entries];
        newEntries.splice(index, 1);
        setEntries(newEntries);
    }

    return (
        <div className="glass-panel p-6 rounded-2xl">
            <h2 className="text-xl font-semibold text-slate-200 mb-6 flex items-center gap-2">
                <svg className="w-5 h-5 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                Status Graph & Tracking
            </h2>
            
            {/* Form Entry */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8 bg-slate-800/40 p-4 rounded-xl border border-slate-700/50">
                <div className="col-span-1 md:col-span-1">
                    <label className="label-text">Start</label>
                    <input type="time" value={currentEntry.start_time} onChange={(e) => setCurrentEntry({...currentEntry, start_time: e.target.value})} className="input-field py-2" />
                </div>
                <div className="col-span-1 md:col-span-1">
                    <label className="label-text">End</label>
                    <input type="time" value={currentEntry.end_time} onChange={(e) => setCurrentEntry({...currentEntry, end_time: e.target.value})} className="input-field py-2" />
                </div>
                <div className="col-span-2 md:col-span-1">
                    <label className="label-text">Status</label>
                    <select value={currentEntry.duty_status} onChange={(e) => setCurrentEntry({...currentEntry, duty_status: parseInt(e.target.value)})} className="input-field py-2">
                        {statuses.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
                    </select>
                </div>
                <div className="col-span-2 md:col-span-1">
                    <label className="label-text">Location</label>
                    <input type="text" placeholder="City, State" value={currentEntry.location} onChange={(e) => setCurrentEntry({...currentEntry, location: e.target.value})} className="input-field py-2" />
                </div>
                <div className="col-span-2 md:col-span-1">
                    <label className="label-text">Remarks</label>
                    <input type="text" placeholder="e.g. Fueling" value={currentEntry.remarks} onChange={(e) => setCurrentEntry({...currentEntry, remarks: e.target.value})} className="input-field py-2" />
                </div>
                <div className="col-span-2 md:col-span-1 flex items-end">
                    <button onClick={handleAddEntry} className="w-full bg-slate-700 hover:bg-slate-600 text-cyan-400 font-medium py-2 rounded-lg transition-colors border border-slate-600 hover:border-cyan-500">
                        Add Entry
                    </button>
                </div>
            </div>

            {/* List of current tracked entries */}
            <div className="space-y-3">
                {entries.length === 0 ? (
                    <div className="text-center p-8 text-slate-500 border border-dashed border-slate-700 rounded-xl">No entries added yet. Add a status block above to start building the daily log.</div>
                ) : (
                    entries.map((entry, idx) => (
                        <div key={idx} className="group flex items-center justify-between bg-slate-800/30 p-3 rounded-lg border border-slate-700/50 hover:border-cyan-500/30 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="text-cyan-400 font-mono text-sm bg-cyan-900/30 px-2 py-1 rounded">
                                    {entry.start_time} - {entry.end_time}
                                </div>
                                <div>
                                    <span className="text-slate-200 font-medium mr-2">{statuses.find(s=>s.id === entry.duty_status)?.label}</span>
                                    <span className="text-slate-400 text-sm">@ {entry.location} {entry.remarks ? `(${entry.remarks})` : ''}</span>
                                </div>
                            </div>
                            <button onClick={() => removeEntry(idx)} className="text-slate-500 hover:text-rose-400 p-1 transition-colors opacity-0 group-hover:opacity-100">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default React.memo(LogGrid);
