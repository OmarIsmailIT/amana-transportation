'use client';

import React, { useState } from 'react';
import BusSchedule from './BusSchedule';
import StopSchedule from './StopSchedule';

interface ScheduleTabsProps {
  buses: any[]; // reuse your Bus[] type if exported
}

const ScheduleTabs = ({ buses }: ScheduleTabsProps) => {
  const [view, setView] = useState<'bus' | 'stop'>('bus');

  return (
    <section className="bg-amana-bg py-12">
      <div className="container mx-auto px-6">
        {/* Tab buttons */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setView('bus')}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              view === 'bus'
                ? 'bg-amana-green text-white shadow-lg'
                : 'bg-amana-surface text-amana-text hover:bg-amana-bg border'
            }`}
          >
            By Bus
          </button>
          <button
            onClick={() => setView('stop')}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              view === 'stop'
                ? 'bg-amana-green text-white shadow-lg'
                : 'bg-amana-surface text-amana-text hover:bg-amana-bg border'
            }`}
          >
            By Stop
          </button>
        </div>

        {/* Render the chosen view */}
        {view === 'bus' ? (
          <BusSchedule buses={buses} />
        ) : (
          <StopSchedule buses={buses} />
        )}
      </div>
    </section>
  );
};

export default ScheduleTabs;