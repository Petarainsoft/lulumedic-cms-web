import { get } from './base/BaseApi';
import { Any, ID } from 'constants/types';
import Doctor from 'models/accounts/Doctor';
import DoctorSchedule from 'models/appointment/DoctorSchedule';

export const fetchDoctors = async () => {
  const res = await get<Doctor[]>('/doctors');
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
