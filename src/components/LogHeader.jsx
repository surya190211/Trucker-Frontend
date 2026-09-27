import React from 'react';

const LogHeader = ({ formData, handleInputChange }) => {
    return (
        <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-100 rounded-md">
            <div>
                <label className="block text-sm font-medium">Date</label>
                <input type="date" name="date" value={formData.date} onChange={handleInputChange} className="w-full p-2 border rounded" />
            </div>
            <div>
                <label className="block text-sm font-medium">Driver Name</label>
                <input type="text" name="driver_name" value={formData.driver_name} onChange={handleInputChange} className="w-full p-2 border rounded" />
            </div>
            <div>
                <label className="block text-sm font-medium">Tractor Number</label>
                <input type="text" name="tractor_number" value={formData.tractor_number} onChange={handleInputChange} className="w-full p-2 border rounded" />
            </div>
            <div>
                <label className="block text-sm font-medium">Trailer Number</label>
                <input type="text" name="trailer_number" value={formData.trailer_number} onChange={handleInputChange} className="w-full p-2 border rounded" />
            </div>
            <div>
                <label className="block text-sm font-medium">Shipper & Commodity</label>
                <input type="text" name="shipper_commodity" value={formData.shipper_commodity} onChange={handleInputChange} className="w-full p-2 border rounded" />
            </div>
            <div>
                <label className="block text-sm font-medium">Total Miles Driven</label>
                <input type="number" name="total_miles_driven" value={formData.total_miles_driven} onChange={handleInputChange} className="w-full p-2 border rounded" />
            </div>
            <div className="col-span-3">
                <label className="block text-sm font-medium">Signature</label>
                <input type="text" name="signature" value={formData.signature} onChange={handleInputChange} className="w-full p-2 border rounded" />
            </div>
        </div>
    );
};

export default LogHeader;
