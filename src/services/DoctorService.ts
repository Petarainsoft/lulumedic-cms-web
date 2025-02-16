import { get } from './base/BaseApi';
import { Any } from 'constants/types';
import Doctor from 'models/accounts/Doctor';

export const fetchDoctors = async () => {
  const res = await get<Doctor[]>('/doctors');
  const data = (res.data || []).map((item: Any) => new Doctor(item));

  return data;
};
