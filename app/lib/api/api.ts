import { Camper } from '@/app/types/catalog';
import axios from 'axios';

export interface CampersListResponse {
  page: number;
  perPage: number;
  campers: Camper[];
  total: number;
  totalPages: number;
}

export interface CamperFilters {
  location: string;
  form: string;
  engine: string;
  transmission: string;
}

export interface FetchCampersParams extends Partial<CamperFilters> {
  page: number;
  perPage: number;
}

export interface AvailableFilters {
  forms: string[];
  engines: string[];
  transmissions: string[];
}

export const baseURL =
  process.env.BACKEND_URL ?? 'https://campers-api.goit.study';

export const Nextapi = axios.create({
  baseURL: baseURL,
});
