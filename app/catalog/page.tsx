import type { Metadata } from 'next';
import Catalog from '@/components/Catalog/Catalog';

export const metadata: Metadata = {
  title: 'Camper catalog',
  description:
    'Browse available campervans and filter by location, body type, engine, and transmission.',
};

const Campers = () => <Catalog />;

export default Campers;
