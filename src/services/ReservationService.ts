import Appointment, { AppointmentBody } from 'models/appointment/Appointment';
import { get, Pagination, patch } from './base/BaseApi';
import { Any, ID } from 'constants/types';
import { MedicalStatus, ReservationPeriod, ReservationKeywordType, STATUS_TYPE, TreatmentStatus } from 'core/enum';
export type SearchFilter = {
  status?: STATUS_TYPE[];
  medicalStatus?: MedicalStatus[];
  period?: ReservationPeriod;
  startDate?: string;
  endDate?: string;
  keywordType?: ReservationKeywordType;
  keyword?: string;
  departmentId?: ID[];

  patientName?: string;
  patientPhone?: string;

  startAppointmentDate?: string;
  endAppointmentDate?: string;

  startReceiptDate?: string;
  endReceiptDate?: string;

  patientId?: ID;
  id?: ID; // id of reservation
  treatmentStatus?: TreatmentStatus[];
} & Pagination;

export const fetchReservations = async (payload?: SearchFilter) => {
  const res = await get<Appointment[]>('/appointments/details', payload);
  const data = (res?.data || []).map((item: Any) => new Appointment(item));

  return {
    data,
    meta: res?.meta,
  };
};

export const fetchReservationById = async (id: ID) => {
  const res = await get<Appointment>(`/appointments/${id}/details`);
  const data = new Appointment(res?.data);

  return data;
};

export const updateReservationById = async (id: ID, data: AppointmentBody) => {
  const res = await patch<Appointment>(`/appointments/${id}`, data);

  return res;
};
