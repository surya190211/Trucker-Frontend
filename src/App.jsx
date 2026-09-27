import React, { useState } from 'react';
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

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            const payload = {
                ...formData,
                entries: entries
            };
            await createLog(payload);
            setStatusMessage({ type: 'success', text: 'Logbook saved successfully!' });
        } catch (error) {
            const errorMsg = error.response?.data ? JSON.stringify(error.response.data) : 'Failed to save logbook.';
            setStatusMessage({ type: 'error', text: errorMsg });
        }
    };

    return (
        <div className="min-h-screen bg-gray-200 p-8">
            <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-6">Digital Driver Logbook</h1>
                
                <LogHeader formData={formData} handleInputChange={handleInputChange} />
                
                <LogGrid entries={entries} setEntries={setEntries} />
                
                <SummaryCalculations entries={entries} />

                {statusMessage.text && (
                    <div className={`mt-4 p-3 rounded ${statusMessage.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {statusMessage.text}
                    </div>
                )}

                <div className="mt-8 text-right">
                    <button 
                        onClick={handleSubmit} 
                        className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded font-bold shadow-md transition-colors">
                        Submit Daily Log
                    </button>
                </div>
            </div>
        </div>
    );
};

export default App;
