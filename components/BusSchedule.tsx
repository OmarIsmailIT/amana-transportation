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
  const [now, setNow] = useState(new Date());

    useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(interval);
  }, []);



  useEffect(() => {
    // Set the first bus as selected by default
    if (buses && buses.length > 0) {
      setSelectedBus(buses[0]);
    }
  }, [buses]);

const formatTime = (time: string) => {
  if (!time) return "—";

  // Split "HH:mm"
  const [hours, minutes] = time.split(":").map(Number);

  // Create a Date for today at that time
  const now = new Date();
  const arrival = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hours,
    minutes
  );

  // If arrival already passed today, assume it's for tomorrow
  if (arrival.getTime() < now.getTime()) {
    arrival.setDate(arrival.getDate() + 1);
  }

  const diff = arrival.getTime() - now.getTime();

  if (diff <= 0) return "Arrived";

  const h = Math.floor(diff / (1000 * 60 * 60));
  const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
};

  return (
    <section className="bg-amana-bg py-12">
      <div className="container mx-auto px-6">
        <h3 className="text-3xl font-bold text-center mb-8 color-amana-text">Bus Schedule</h3>
        <div className="flex justify-center flex-wrap gap-3 mb-6">
          {buses.map((bus) => (
            <button
              key={bus.name}
              onClick={() => setSelectedBus(bus)}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-300 ${
                selectedBus?.name === bus.name
                  ? 'bg-amana-green text-white shadow-lg'
                  : 'bg-amana-surface text-amana-text hover:bg-amana-bg border'
              }`}
            >
              {bus.name}
            </button>
          ))}
        </div>

        {selectedBus && (
          <div className="overflow-x-auto bg-amana-surface rounded-xl shadow-xl border border-gray-200">
            <table className="min-w-full text-left">
              <thead className="bg-amana-bg">
                <tr>
                  <th className="px-6 py-3 text-sm font-semibold text-amana-text uppercase tracking-wider">Bus Stop</th>
                  <th className="px-6 py-3 text-sm font-semibold text-amana-text uppercase tracking-wider text-right">Next Arrival</th>
                  <th className="px-6 py-3 text-sm font-semibold text-amana-text uppercase tracking-wider text-right">Capacity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {selectedBus.stops.map((stop, index) => (
                  <tr
                    key={index}
                    className={`${
                      stop.name === selectedBus.next_stop
                        ? 'bg-amana-accent/20'
                        : 'hover:bg-amana-bg'
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-amana-text">{stop.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-amana-text-muted text-right">Arrives in {formatTime(stop.next_arrival)}</td>
                    {/* <td className="px-6 py-4 whitespace-nowrap text-amana-text-muted text-right">{stop.next_arrival}</td> */}
                    <td className="px-6 py-4 whitespace-nowrap text-right text-amana-text-muted flex items-center  justify-end ">
                        {/* Capacity bar */}
                        <div className="w-32 h-3 bg-gray-200 rounded-full overflow-hidden ">
                          <div
                            className={`h-full ${
                              selectedBus.capacity > 80
                                ? "bg-red-500"
                                : selectedBus.capacity > 50
                                ? "bg-yellow-500"
                                : "bg-green-500"
                            }`}
                            style={{ width: `${selectedBus.capacity}%` }}
                          />
                        </div>
                        <span className="text-xs text-amana-text-muted ml-2">
                          {selectedBus.capacity}%
                        </span>
                      </td>
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
