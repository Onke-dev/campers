import { Camper} from '@/app/types/catalog';
import axios from 'axios';

export interface CampersListResponse {
  campers: Camper[];
  total: number;
  totalPages: number;
}

export interface FetchCampersParams {
  search: string;
  page: number;
  tag?: string;
}

export const baseURL =
  process.env.BACKEND_URL ?? 'https://campers-api.goit.study';

export const Nextapi = axios.create({
  baseURL: baseURL,
});
