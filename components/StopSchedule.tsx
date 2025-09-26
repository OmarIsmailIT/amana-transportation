// components/StopSchedule.tsx
'use client';

import React, { useState, useEffect } from 'react';

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

interface StopView {
  name: string;
  buses: {
    busName: string;
    next_arrival: string;
    capacity: number;
  }[];
}

const StopSchedule = ({ buses }: { buses: Bus[] }) => {
  const [stops, setStops] = useState<StopView[]>([]);
  const [selectedStop, setSelectedStop] = useState<StopView | null>(null);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    // Update "now" every 30s
    const interval = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Transform buses → stops
    const stopMap: Record<string, StopView> = {};

    buses.forEach((bus) => {
      bus.stops.forEach((stop) => {
        if (!stopMap[stop.name]) {
          stopMap[stop.name] = { name: stop.name, buses: [] };
        }
        stopMap[stop.name].buses.push({
          busName: bus.name,
          next_arrival: stop.next_arrival,
          capacity: bus.capacity,
        });
      });
    });

    const stopList = Object.values(stopMap);
    setStops(stopList);
    if (stopList.length > 0) setSelectedStop(stopList[0]);
  }, [buses]);

  const formatCountdown = (time: string) => {
    if (!time) return "—";
    const [hours, minutes] = time.split(":").map(Number);
    let arrival = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hours,
      minutes
    );
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
        <h3 className="text-3xl font-bold text-center mb-8 text-amana-dark">
          Stop Schedule
        </h3>

        {/* Stop selector */}
        <div className="flex justify-center flex-wrap gap-3 mb-6">
          {stops.map((stop) => (
            <button
              key={stop.name}
              onClick={() => setSelectedStop(stop)}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-300 ${
                selectedStop?.name === stop.name
                  ? 'bg-amana-green text-white shadow-lg'
                  : 'bg-amana-surface text-amana-text hover:bg-amana-bg border'
              }`}
            >
              {stop.name}
            </button>
          ))}
        </div>

        {/* Table of buses for this stop */}
        {selectedStop && (
          <div className="overflow-x-auto bg-amana-surface rounded-xl shadow-xl border border-gray-200">
            <table className="min-w-full text-left">
              <thead className="bg-amana-bg">
                <tr>
                  <th className="px-6 py-3 text-sm font-semibold text-amana-text uppercase tracking-wider">
                    Bus
                  </th>
                  <th className="px-6 py-3 text-sm font-semibold text-amana-text uppercase tracking-wider text-right">
                    Next Arrival
                  </th>
                  <th className="px-6 py-3 text-sm font-semibold text-amana-text uppercase tracking-wider text-right">
                    Capacity
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {selectedStop.buses.map((bus, index) => {
                  const countdown = formatCountdown(bus.next_arrival);
                  return (
                    <tr key={index} className="hover:bg-amana-bg">
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-amana-text">
                        {bus.busName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-amana-text-muted text-right">
                        {countdown}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="w-32 h-3 bg-gray-200 rounded-full overflow-hidden inline-block align-middle">
                          <div
                            className={`h-full ${
                              bus.capacity > 80
                                ? "bg-red-500"
                                : bus.capacity > 50
                                ? "bg-yellow-500"
                                : "bg-green-500"
                            }`}
                            style={{ width: `${bus.capacity}%` }}
                          />
                        </div>
                        <span className="text-xs text-amana-text-muted ml-2">
                          {bus.capacity}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default StopSchedule;