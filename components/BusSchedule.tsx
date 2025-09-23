// components/BusSchedule.tsx
'use client';

import React, { useState, useEffect } from 'react';

// Define types to match the data structure
interface Stop {
  name: string;
  next_arrival: string;
  position: [number, number];
}

interface Bus {
  name: string;
  capacity: number;
  next_stop: string;
  position: [number, number];
  route: [number, number][];
  stops: Stop[];
}

interface BusScheduleProps {
  buses: Bus[];
}

const BusSchedule = ({ buses }: BusScheduleProps) => {
  const [selectedBus, setSelectedBus] = useState<Bus | null>(null);

  useEffect(() => {
    // Set the first bus as selected by default
    if (buses && buses.length > 0) {
      setSelectedBus(buses[0]);
    }
  }, [buses]);

  return (
    <section className="bg-amana-bg py-12">
      <div className="container mx-auto px-6">
        <h3 className="text-3xl font-bold text-center mb-8 text-amana-dark">Bus Schedule</h3>
        <div className="flex justify-center flex-wrap gap-2 mb-6">
          {buses.map((bus) => (
            <button
              key={bus.name}
              onClick={() => setSelectedBus(bus)}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-300 ${
                selectedBus?.name === bus.name
                  ? 'bg-amana-green text-white shadow-lg'
                  : 'bg-amana-surface text-amana-text hover:bg-gray-100 border'
              }`}
            >
              {bus.name}
            </button>
          ))}
        </div>

        {selectedBus && (
          <div className="overflow-x-auto bg-amana-surface rounded-xl shadow-xl border border-gray-200">
            <table className="min-w-full text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-sm font-semibold text-amana-text uppercase tracking-wider">Bus Stop</th>
                  <th className="px-6 py-3 text-sm font-semibold text-amana-text uppercase tracking-wider text-right">Next Arrival</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {selectedBus.stops.map((stop, index) => (
                  <tr
                    key={index}
                    className={`${
                      stop.name === selectedBus.next_stop
                        ? 'bg-amana-accent/20'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-amana-text">{stop.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-amana-text-muted text-right">{stop.next_arrival}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default BusSchedule;
