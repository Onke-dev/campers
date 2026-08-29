export interface Camper {
  id: string;
  name: string;
  price: number;
  rating: number;
  location: string;
  description: string;
  form: string;
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
  transmission: string;
  engine: string;
  amenities: [
    'ac',
    'bathroom',
    'kitchen',
    'tv',
    'radio',
    'refrigerator',
    'microwave',
    'gas',
    'water',
  ];
  coverImage: string;
  totalReviews: number;
}
