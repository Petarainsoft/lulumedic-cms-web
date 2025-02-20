import { get, patch, post } from './base/BaseApi';
import { Any, ID } from 'constants/types';
import Doctor, { DoctorBody } from 'models/accounts/Doctor';
import DoctorSchedule from 'models/appointment/DoctorSchedule';

export type SearchFilter = {
  departmentId?: ID[];
  name?: string;
};

export const fetchDoctors = async (payload?: SearchFilter) => {
  const res = await get<Doctor[]>('/doctors', payload);
  const data = (res.data || []).map((item: Any) => new Doctor(item));

  return data;
};

export const findDoctorById = async (id: ID) => {
  const res = await get<Doctor[]>(`/doctors/${id}`);

  return new Doctor(res?.data);
};

export const fetchWorkingSchedulesByDoctorId = async (doctorId: ID) => {
  const rs = await get<DoctorSchedule[]>(`/doctors/${doctorId}/working-schedules`);
  const data = (rs.data || []).map((item: Any) => new DoctorSchedule(item));

  return data;
};

export const updateDoctorById = async (id: ID, payload: DoctorBody) => {
  const res = await patch<Doctor>(`/doctors/${id}`, payload);

  return res?.data || {};
};

export const createDoctor = async (payload: DoctorBody) => {
  const res = await post<Doctor>('/doctors', payload);

  return res?.data || {};
};
