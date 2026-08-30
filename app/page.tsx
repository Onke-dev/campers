import type { Metadata } from 'next';
import Hero from "@/components/Hero/Hero";

export const metadata: Metadata = {
  title: 'Campers of your dreams',
  description:
    'Discover the perfect campervan for your next adventure in the TravelTrucks catalog.',
};

export default function Home() {
  return (
    <>
      <Hero/>
    </>
  );
}
