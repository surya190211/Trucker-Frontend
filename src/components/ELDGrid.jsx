import React from 'react';

export default function ELDGrid({ segments }) {
    const STATUS_ROWS = ['OFF DUTY', 'SLEEPER BERTH', 'DRIVING', 'ON DUTY'];
    
    // Parse time to X coordinate (0 to 100%)
    const getX = (isoString) => {
        const d = new Date(isoString);
        const minutes = d.getHours() * 60 + d.getMinutes();
        return (minutes / 1440) * 100;
    };

    // Calculate lines
    let currentX = 0;
    let currentY = 0; // Off Duty
    
    const lines = segments.map((seg, i) => {
        const startX = i === 0 ? 0 : getX(seg.start);
        const endX = i === segments.length - 1 && getX(seg.end) === 0 ? 100 : getX(seg.end);
        
        let yIdx = 0;
        if (seg.status === 'SLEEPER BERTH') yIdx = 1;
        if (seg.status === 'DRIVING') yIdx = 2;
        if (seg.status === 'ON DUTY') yIdx = 3;
        
        const yPos = (yIdx * 25) + 12.5; // Centers in row
        
        // Vertical transition line from previous status if needed
        const result = [];
        if (i > 0 && currentY !== yPos) {
            result.push(<line key={`v-${i}`} x1={`${startX}%`} y1={`${currentY}%`} x2={`${startX}%`} y2={`${yPos}%`} stroke="#06b6d4" strokeWidth="2" />);
        }
        
        // Horizontal duration line
        result.push(<line key={`h-${i}`} x1={`${startX}%`} y1={`${yPos}%`} x2={`${endX}%`} y2={`${yPos}%`} stroke="#06b6d4" strokeWidth="3" />);
        
        currentX = endX;
        currentY = yPos;
        return result;
    });

    return (
        <div className="w-full bg-slate-100 print:bg-white p-4 rounded-xl text-black font-mono border border-black/20">
            <div className="flex border border-black h-48 relative">
                {/* Labels */}
                <div className="w-32 border-r border-black flex flex-col">
                    {STATUS_ROWS.map((label, i) => (
                        <div key={i} className="flex-1 flex items-center justify-start text-[10px] sm:text-xs pl-2 font-bold border-b border-black last:border-0 leading-tight">
                            {label}
                        </div>
                    ))}
                </div>
                
                {/* Grid Area */}
                <div className="flex-1 relative mt-1">
                    {/* Hour Vertical Lines */}
                    {[...Array(24)].map((_, i) => (
                        <div key={i} className={`absolute top-0 bottom-0 border-l ${i % 12 === 0 ? 'border-black' : 'border-gray-300'} z-0`} style={{left: `${(i/24)*100}%`}}></div>
                    ))}
                    
                    {/* Quarter Hour Tick Marks */}
                    {[...Array(96)].map((_, i) => (
                        <div key={i} className={`absolute top-0 h-2 border-l border-gray-400 z-0`} style={{left: `${(i/96)*100}%`}}></div>
                    ))}
                    
                    {/* Horizontal Row Lines */}
                    {[1, 2, 3].map(i => (
                        <div key={i} className="absolute left-0 right-0 border-t border-gray-400 z-0" style={{top: `${(i/4)*100}%`}}></div>
                    ))}
                    
                    {/* Data Lines (SVG Overlay) */}
                    <svg className="absolute inset-0 w-full h-full z-10 overflow-visible">
                        {lines}
                    </svg>
                    
                    {/* Hour Labels */}
                    <div className="absolute -top-5 left-0 right-0 flex justify-between text-[10px] font-bold px-1">
                        <span>M</span>
                        <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span>
                        <span>N</span>
                        <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
