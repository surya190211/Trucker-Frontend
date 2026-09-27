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
        setEntries([...entries, currentEntry]);
        setCurrentEntry({ start_time: '', end_time: '', duty_status: 1, location: '', remarks: '' });
    };

    return (
        <div className="mb-6">
            <h3 className="text-lg font-bold mb-2">Log Entries</h3>
            
            <div className="bg-white border rounded p-4 mb-4 overflow-x-auto relative">
                <div className="flex border-b">
                    <div className="w-32 flex-shrink-0 font-bold border-r">Status</div>
                    {[...Array(24)].map((_, i) => (
                        <div key={i} className="flex-1 text-xs text-center border-r min-w-[40px]">{i}</div>
                    ))}
                </div>
                {statuses.map(status => (
                    <div key={status.id} className="flex border-b h-8 items-center">
                        <div className="w-32 flex-shrink-0 text-sm border-r pr-2">{status.label}</div>
                        <div className="flex-1 relative w-full flex">
                            {[...Array(24 * 4)].map((_, i) => (
                                <div key={i} className="flex-1 border-r border-gray-100 min-w-[10px]"></div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex gap-2 items-end bg-gray-50 p-4 rounded flex-wrap">
                <div>
                    <label className="block text-xs">Start (HH:MM)</label>
                    <input type="time" value={currentEntry.start_time} onChange={(e) => setCurrentEntry({...currentEntry, start_time: e.target.value})} className="p-1 border rounded" />
                </div>
                <div>
                    <label className="block text-xs">End (HH:MM)</label>
                    <input type="time" value={currentEntry.end_time} onChange={(e) => setCurrentEntry({...currentEntry, end_time: e.target.value})} className="p-1 border rounded" />
                </div>
                <div>
                    <label className="block text-xs">Status</label>
                    <select value={currentEntry.duty_status} onChange={(e) => setCurrentEntry({...currentEntry, duty_status: parseInt(e.target.value)})} className="p-1 border rounded">
                        {statuses.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-xs">Location</label>
                    <input type="text" value={currentEntry.location} onChange={(e) => setCurrentEntry({...currentEntry, location: e.target.value})} className="p-1 border rounded w-32" />
                </div>
                <div>
                    <label className="block text-xs">Remarks</label>
                    <input type="text" value={currentEntry.remarks} onChange={(e) => setCurrentEntry({...currentEntry, remarks: e.target.value})} className="p-1 border rounded w-32" />
                </div>
                <button onClick={handleAddEntry} className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">Add</button>
            </div>

            <div className="mt-4">
                {entries.map((entry, idx) => (
                    <div key={idx} className="text-sm border-b py-1">
                        {entry.start_time} to {entry.end_time} - Status {entry.duty_status} | {entry.location} ({entry.remarks})
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LogGrid;
