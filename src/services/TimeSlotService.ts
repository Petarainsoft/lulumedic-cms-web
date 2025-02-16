import { get } from './base/BaseApi';
import { Any } from 'constants/types';
import TimeSlot from 'models/appointment/TimeSlot';

export const fetchTimeSlots = async () => {
  const res = await get<TimeSlot[]>('/timeSlots');
  const data = (res.data || []).map((item: Any) => new TimeSlot(item));

  return data;
};
