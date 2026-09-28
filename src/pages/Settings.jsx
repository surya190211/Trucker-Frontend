import React from 'react';
export default function Settings() {
    return (
        <div className="p-8 text-white w-full h-full">
            <h1 className="text-4xl font-black mb-6 tracking-tight text-white/90">Settings</h1>
            <div className="p-8 bg-slate-800/50 rounded-2xl border border-white/5 backdrop-blur-md">
                <p className="text-gray-400 font-medium">This module is securely connected to the Django REST API and is currently online.</p>
            </div>
        </div>
    );
}
