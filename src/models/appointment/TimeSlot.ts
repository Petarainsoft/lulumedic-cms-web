import { ID, Obj } from 'constants/types';
import DataModel from 'models/base/DataModel';

class TimeSlot extends DataModel<TimeSlot> {
  workingDate?: string;
  isFull?: boolean;
  doctorId?: ID;
  workingScheduleId?: ID;

  constructor(payload: Obj) {
    super();

    if (payload) {
      this.init(payload);
    }
  }

  toBody(): TimeSlotBody {
    return {
      workingDate: this.workingDate,
      isFull: this.isFull,
      doctorId: this.doctorId,
      workingScheduleId: this.workingScheduleId,
    };
  }
}

export type TimeSlotDto = Partial<TimeSlot>;
export type TimeSlotBody = Partial<TimeSlot>;

export default TimeSlot;
