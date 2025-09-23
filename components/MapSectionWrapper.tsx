// components/MapSectionWrapper.tsx
"use client";

import dynamic from "next/dynamic";

// Dynamically import the actual map component
const MapSection = dynamic(() => import("./MapSection"), {
  ssr: false,
});

export default MapSection;