import { Camper } from '@/app/types/catalog';
import {
  AvailableFilters,
  CampersListResponse,
  FetchCampersParams,
  Nextapi,
} from './api';
import { Feedback } from '@/app/types/feedback';
import type {
  BookingRequest,
  BookingRequestResponse,
} from '@/app/types/booking';

// const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getCampers = async (
  params: FetchCampersParams,
): Promise<CampersListResponse> => {
  const res = await Nextapi.get<CampersListResponse>('/campers', { params });
  return res.data;
};

export const getAvailableFilters = async (): Promise<AvailableFilters> => {
  const { data } = await Nextapi.get<AvailableFilters>('/campers/filters');
  return data;
};

export const getCamperById = async (camperId: string): Promise<Camper> => {
  const res = await Nextapi.get<Camper>(`/campers/${camperId}`);
  return res.data;
};

export const getReviews = async (camperId: string): Promise<Feedback[]> => {
  const { data } = await Nextapi.get<Feedback[]>(
    `/campers/${camperId}/reviews`,
  );

  return data;
};

export const createBookingRequest = async (
  camperId: string,
  booking: BookingRequest,
): Promise<BookingRequestResponse> => {
  const { data } = await Nextapi.post<BookingRequestResponse>(
    `/campers/${camperId}/booking-requests`,
    booking,
  );

  return data;
};
