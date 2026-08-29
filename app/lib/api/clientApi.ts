import { Camper } from '@/app/types/catalog';
import { CampersListResponse, Nextapi } from './api';

// const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getCampers = async (): Promise<CampersListResponse> => {
  // await delay(60000);
  const res = await Nextapi.get<CampersListResponse>('/campers');
  return res.data;
};

export const getCamperById = async (camperId: string): Promise<Camper> => {
  const res = await Nextapi.get<Camper>(`/campers/${camperId}`);
  return res.data;
};
