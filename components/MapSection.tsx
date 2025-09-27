// components/MapSection.tsx
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Define the types for our data based on the API response structure
interface Stop {
  name: string;
  position: [number, number];
  next_arrival: string;
}

interface Bus {
  name: string;
  capacity: number;
  next_stop: string;
  position: [number, number];
  route: [number, number][];
  stops: Stop[];
}

interface MapSectionProps {
  buses: Bus[];
}

// Custom bus icon
const busIcon = new L.Icon({
  iconUrl: '/bus.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 20],
  popupAnchor: [0, -20],
});

// Custom stop icon
const stopIcon = new L.Icon({
    iconUrl: '/pin.svg',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30]
});


const MapSection = ({ buses }: MapSectionProps) => {
  const [selectedBus, setSelectedBus] = useState<Bus | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (buses && buses.length > 0) {
      setSelectedBus(buses[0]);
    }
  }, [buses]);

  const mapCenter: L.LatLngExpression = useMemo(() => {
      if (selectedBus) {
          return selectedBus.route[Math.floor(selectedBus.route.length / 2)] as L.LatLngExpression;
      }
      return [32.2238, 35.2612]; // Default center if no bus is selected
  }, [selectedBus]);

  if (!isClient) {
    return null; // Don't render on the server
  }

  return (
    <section className="container mx-auto px-6 py-12">
      <h3 className="text-3xl font-bold text-center mb-8 color-amana-text">Active Bus Map</h3>
      <div className="flex justify-center flex-wrap gap-3 mb-6">
        {buses.map((bus) => (
          <button
            key={bus.name}
            onClick={() => setSelectedBus(bus)}
            className={`px-4 py-2.5 rounded-lg font-medium transition-colors duration-300 ${
              selectedBus?.name === bus.name
                ? 'bg-amana-green text-white shadow-lg'
                : 'bg-amana-surface text-amana-text hover:bg-amana-bg border'
            }`}
          >
            {bus.name}
          </button>
        ))}
      </div>

      <div className="h-[500px] w-full rounded-xl shadow-xl overflow-hidden border border-gray-200">
        <MapContainer center={mapCenter} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {selectedBus && (
            <>
              {/* Draw the bus route */}
              <Polyline positions={selectedBus.route} color="#A1C568" weight={5} />

              {/* Mark the bus stops */}
              {selectedBus.stops.map((stop, index) => (
                <Marker key={index} position={stop.position} icon={stopIcon}>
                  <Popup>
                    <b>{stop.name}</b>
                    <br />
                    Next Bus: {stop.next_arrival}
                  </Popup>
                </Marker>
              ))}

              {/* Mark the bus's current position */}
              <Marker position={selectedBus.position} icon={busIcon}>
                <Popup>
                  <b>{selectedBus.name}</b>
                  <br />
                  Capacity: {selectedBus.capacity}%
                  <br />
                  Next Stop: {selectedBus.next_stop}
                </Popup>
              </Marker>
            </>
          )}
        </MapContainer>
      </div>
    </section>
  );
};

export default MapSection;
