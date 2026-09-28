import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import LogHistory from './pages/LogHistory';
import Drivers from './pages/Drivers';
import Trucks from './pages/Trucks';
import Trips from './pages/Trips';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-900 text-slate-100 flex">
        {/* Sidebar */}
        <div className="w-64 bg-slate-900 p-8 flex flex-col gap-6 border-r border-white/10 shadow-2xl z-10 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent pointer-events-none"></div>
          <h2 className="text-3xl font-black text-cyan-400 mb-8 tracking-tighter flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 shadow-lg shadow-cyan-500/20"></div>
            TRUCK<span className="text-white">OS</span>
          </h2>
          
          <div className="flex flex-col gap-2">
              <Link to="/" className="px-4 py-3 hover:bg-white/5 rounded-xl transition-all font-medium flex items-center gap-3 text-slate-300 hover:text-white">Dashboard</Link>
              <Link to="/logs" className="px-4 py-3 hover:bg-white/5 rounded-xl transition-all font-medium flex items-center gap-3 text-slate-300 hover:text-white">Log History</Link>
              <Link to="/drivers" className="px-4 py-3 hover:bg-white/5 rounded-xl transition-all font-medium flex items-center gap-3 text-slate-300 hover:text-white">Drivers</Link>
              <Link to="/trucks" className="px-4 py-3 hover:bg-white/5 rounded-xl transition-all font-medium flex items-center gap-3 text-slate-300 hover:text-white">Trucks</Link>
              <Link to="/trips" className="px-4 py-3 hover:bg-white/5 rounded-xl transition-all font-medium flex items-center gap-3 text-slate-300 hover:text-white">Trips</Link>
              <Link to="/reports" className="px-4 py-3 hover:bg-white/5 rounded-xl transition-all font-medium flex items-center gap-3 text-slate-300 hover:text-white">Reports</Link>
          </div>
          
          <Link to="/settings" className="px-4 py-3 hover:bg-white/5 rounded-xl transition-all font-medium flex items-center gap-3 text-slate-400 hover:text-white mt-auto">System Settings</Link>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 bg-[#0b1120] relative overflow-y-auto">
          <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-cyan-900/20 to-transparent pointer-events-none"></div>
          <div className="relative z-10 h-full p-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/logs" element={<LogHistory />} />
              <Route path="/drivers" element={<Drivers />} />
              <Route path="/trucks" element={<Trucks />} />
              <Route path="/trips" element={<Trips />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}
