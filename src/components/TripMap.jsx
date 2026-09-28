import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet's default icon path issues
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Polyline decoder for OSRM geometry
const decodePolyline = (str, precision) => {
    let index = 0, lat = 0, lng = 0, coordinates = [], shift = 0, result = 0, byte = null, latitude_change, longitude_change, factor = Math.pow(10, Number.isInteger(precision) ? precision : 5);
    while (index < str.length) {
        byte = null; shift = 0; result = 0;
        do { byte = str.charCodeAt(index++) - 63; result |= (byte & 0x1f) << shift; shift += 5; } while (byte >= 0x20);
        latitude_change = ((result & 1) ? ~(result >> 1) : (result >> 1));
        shift = result = 0;
        do { byte = str.charCodeAt(index++) - 63; result |= (byte & 0x1f) << shift; shift += 5; } while (byte >= 0x20);
        longitude_change = ((result & 1) ? ~(result >> 1) : (result >> 1));
        lat += latitude_change; lng += longitude_change;
        coordinates.push([lat / factor, lng / factor]);
    }
    return coordinates;
};

export default function TripMap({ routeGeometry }) {
    if (!routeGeometry) return null;
    
    // Decode OSRM geometry (polyline format)
    const positions = decodePolyline(routeGeometry);
    
    if (positions.length === 0) return null;
    
    const start = positions[0];
    const end = positions[positions.length - 1];
    
    return (
        <div className="h-64 w-full rounded-2xl overflow-hidden border border-white/10 mt-6 shadow-2xl relative z-0">
            <MapContainer center={start} zoom={5} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Polyline positions={positions} color="#06b6d4" weight={4} opacity={0.8} />
                
                <Marker position={start}>
                    <Popup className="font-bold text-black">Origin / Pickup</Popup>
                </Marker>
                
                <Marker position={end}>
                    <Popup className="font-bold text-black">Destination / Dropoff</Popup>
                </Marker>
            </MapContainer>
        </div>
    );
}
