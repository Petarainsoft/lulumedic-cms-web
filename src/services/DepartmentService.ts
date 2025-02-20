import { get } from './base/BaseApi';
import { Any } from 'constants/types';
import Department from 'models/appointment/Department';

export const fetchTDepartments = async () => {
  const res = await get<Department[]>('/departments');
  const data = (res?.data || []).map((item: Any) => new Department(item));

  return data;
};
