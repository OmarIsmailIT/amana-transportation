// app/page.tsx
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MapSectionWrapper from "@/components/MapSectionWrapper"; // ✅ wrapper
import BusSchedule from "@/components/BusSchedule";
import Footer from "@/components/Footer";
import StopSchedule from "@/components/StopSchedule";
import ScheduleTabs from "@/components/ScheduleTaps";



// Define the types for our data
interface Bus {
  name: string;
  capacity: number;
  next_stop: string;
  position: [number, number];
  route: [number, number][];
  stops: {
    name: string;
    position: [number, number];
    next_arrival: string;
  }[];
}

async function getBusData(): Promise<Bus[]> {
  try {
    const res = await fetch("https://www.amanabootcamp.org/api/fs-classwork-data/amana-transportation", {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await res.json();

    return (data.bus_lines ?? []).map((apiBus: any): Bus => ({
      name: apiBus.name,
      capacity: apiBus.passengers.capacity,
      next_stop: apiBus.bus_stops.find((s: any) => s.is_next_stop)?.name ?? "",
      position: [apiBus.current_location.latitude, apiBus.current_location.longitude],
      route: apiBus.bus_stops.map((s: any) => [s.latitude, s.longitude]),
      stops: apiBus.bus_stops.map((s: any) => ({
        name: s.name,
        next_arrival: s.estimated_arrival,
        position: [s.latitude, s.longitude] as [number, number],
      })),
    }));
  } catch (error) {
    console.error("Could not fetch bus data:", error);
    return [];
  }
}

export default async function Home() {
  const busData = await getBusData();

  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <Hero />
      <MapSectionWrapper buses={busData} />
      <ScheduleTabs buses={busData} />
      <Footer />
    </main>
  );
}
