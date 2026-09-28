import React from 'react';

const LogHeader = ({ formData, handleInputChange }) => {
    return (
        <div className="glass-panel p-6 rounded-2xl">
            <h2 className="text-xl font-semibold text-slate-200 mb-6 flex items-center gap-2">
                <svg className="w-5 h-5 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                Driver Metadata
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                    <label className="label-text">Date</label>
                    <input type="date" name="date" value={formData.date} onChange={handleInputChange} className="input-field" />
                </div>
                <div>
                    <label className="label-text">Driver Name / ID</label>
                    <input type="text" name="driver_name" placeholder="John Doe" value={formData.driver_name} onChange={handleInputChange} className="input-field" />
                </div>
                <div>
                    <label className="label-text">Tractor Number</label>
                    <input type="text" name="tractor_number" placeholder="TRK-1001" value={formData.tractor_number} onChange={handleInputChange} className="input-field" />
                </div>
                <div>
                    <label className="label-text">Trailer Number</label>
                    <input type="text" name="trailer_number" placeholder="Optional" value={formData.trailer_number} onChange={handleInputChange} className="input-field" />
                </div>
                <div>
                    <label className="label-text">Shipper & Commodity</label>
                    <input type="text" name="shipper_commodity" placeholder="Acme Corp / Steel" value={formData.shipper_commodity} onChange={handleInputChange} className="input-field" />
                </div>
                <div>
                    <label className="label-text">Total Miles Driven</label>
                    <input type="number" name="total_miles_driven" placeholder="0" value={formData.total_miles_driven} onChange={handleInputChange} className="input-field" />
                </div>
                <div className="col-span-1 md:col-span-2 lg:col-span-3">
                    <label className="label-text">Digital Signature</label>
                    <input type="text" name="signature" placeholder="Type full name to sign" value={formData.signature} onChange={handleInputChange} className="input-field border-dashed border-cyan-500/50 bg-cyan-500/5 focus:bg-cyan-500/10" />
                </div>
            </div>
        </div>
    );
};

export default React.memo(LogHeader);
