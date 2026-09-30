import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet's default icon path issues
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Component to handle auto-fitting bounds
function MapBounds({ positions }) {
    const map = useMap();
    useEffect(() => {
        if (positions && positions.length > 0) {
            const bounds = L.latLngBounds(positions);
            map.fitBounds(bounds, { padding: [50, 50] });
        }
    }, [map, positions]);
    return null;
}

export default function TripMap({ routeGeometry, waypoints }) {
    const [positions, setPositions] = useState([]);
    
    useEffect(() => {
        if (routeGeometry && routeGeometry.coordinates) {
            // GeoJSON uses [lon, lat], Leaflet needs [lat, lon]
            const coords = routeGeometry.coordinates.map(c => [c[1], c[0]]);
            setPositions(coords);
        }
    }, [routeGeometry]);

    if (!routeGeometry || positions.length === 0) return null;
    
    const curr = waypoints && waypoints.current ? [waypoints.current[1], waypoints.current[0]] : null;
    const pck = waypoints && waypoints.pickup ? [waypoints.pickup[1], waypoints.pickup[0]] : null;
    const drp = waypoints && waypoints.dropoff ? [waypoints.dropoff[1], waypoints.dropoff[0]] : null;
    
    return (
        <div className="h-96 w-full relative z-0">
            <MapContainer center={positions[0]} zoom={5} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Polyline positions={positions} color="#06b6d4" weight={4} opacity={0.8} />
                
                {curr && (
                    <Marker position={curr}>
                        <Popup className="font-bold text-black">Current Location</Popup>
                    </Marker>
                )}
                {pck && (
                    <Marker position={pck}>
                        <Popup className="font-bold text-black">Pickup Location</Popup>
                    </Marker>
                )}
                {drp && (
                    <Marker position={drp}>
                        <Popup className="font-bold text-black">Dropoff Location</Popup>
                    </Marker>
                )}
                
                <MapBounds positions={positions} />
            </MapContainer>
        </div>
    );
}
