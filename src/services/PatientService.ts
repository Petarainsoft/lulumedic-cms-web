import { get } from './base/BaseApi';
import { Any } from 'constants/types';
import Patient from 'models/accounts/Patient';

export const fetchPatients = async () => {
  const res = await get<Patient[]>('/patients');
  const data = (res.data || []).map((item: Any) => new Patient(item));

  return data;
};
