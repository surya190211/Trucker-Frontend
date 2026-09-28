import React, { useState, useCallback } from 'react';
import LogHeader from './components/LogHeader';
import LogGrid from './components/LogGrid';
import SummaryCalculations from './components/SummaryCalculations';
import { createLog } from './services/api';

const App = () => {
    const [formData, setFormData] = useState({
        date: '',
        driver_name: '',
        tractor_number: '',
        trailer_number: '',
        shipper_commodity: '',
        total_miles_driven: 0,
        signature: ''
    });

    const [entries, setEntries] = useState([]);
    const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = useCallback((e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }, []);

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            const payload = {
                ...formData,
                entries: entries
            };
            await createLog(payload);
            setStatusMessage({ type: 'success', text: 'Logbook saved successfully and securely to the backend!' });
        } catch (error) {
            const errorMsg = error.response?.data ? JSON.stringify(error.response.data) : 'Failed to save logbook. Check the console or backend connection.';
            setStatusMessage({ type: 'error', text: errorMsg });
        }
        setIsSubmitting(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
            <div className="max-w-6xl mx-auto space-y-8">
                
                {/* Header Section */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center glass-panel p-6 rounded-2xl">
                    <div>
                        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 tracking-tight">
                            Digital Driver Logbook
                        </h1>
                        <p className="text-slate-400 text-sm mt-1">FMCSA Hours of Service Compliant</p>
                    </div>
                    <div className="mt-4 md:mt-0 flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></div>
                        <span className="text-sm font-medium text-slate-300">System Online</span>
                    </div>
                </header>
                
                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-8 space-y-8">
                        <LogHeader formData={formData} handleInputChange={handleInputChange} />
                        <LogGrid entries={entries} setEntries={setEntries} />
                    </div>
                    <div className="lg:col-span-4 space-y-8">
                        <SummaryCalculations entries={entries} />
                        
                        <div className="glass-panel p-6 rounded-2xl">
                            <button 
                                onClick={handleSubmit} 
                                disabled={isSubmitting}
                                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold py-4 rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all active:scale-95 flex items-center justify-center gap-2">
                                {isSubmitting ? 'Syncing...' : 'Submit Daily Log'}
                                {!isSubmitting && (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                )}
                            </button>

                            {statusMessage.text && (
                                <div className={`mt-4 p-4 rounded-xl text-sm ${statusMessage.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'}`}>
                                    {statusMessage.text}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default App;
