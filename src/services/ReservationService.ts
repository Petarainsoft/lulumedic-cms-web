import Appointment, { AppointmentBody } from 'models/appointment/Appointment';
import { get, patch } from './base/BaseApi';
import { Any, ID } from 'constants/types';

export const fetchReservations = async () => {
  const res = await get<Appointment[]>('/appointments');
  const data = (res.data || []).map((item: Any) => new Appointment(item));

  return data;
};

export const fetchReservationById = async (id: ID) => {
  const res = await get<Appointment>(`/appointments/${id}`);
  const data = new Appointment(res.data);

  return data;
};

export const updateReservationById = async (id: ID, data: AppointmentBody) => {
  const res = await patch<Appointment>(`/appointments/${id}`, data);

  return res;
};
