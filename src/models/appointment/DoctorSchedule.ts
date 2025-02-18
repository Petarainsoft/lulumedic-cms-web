import { ID, Obj } from 'constants/types';
import { WORKING_TYPE } from 'core/enum';
import DataModel from 'models/base/DataModel';

class DoctorSchedule extends DataModel<DoctorSchedule> {
  startTime?: string;
  endTime?: string;
  date?: string;
  doctorId?: ID;
  workingType?: WORKING_TYPE;
  constructor(payload: Obj) {
    super();

    if (payload) {
      this.init(payload);
    }
  }

  toBody(): DoctorScheduleBody {
    return {
      startTime: this.startTime,
      endTime: this.endTime,
      date: this.date,
      doctorId: this.doctorId,
      workingType: this.workingType,
    };
  }
}

export type DoctorScheduleDto = Partial<DoctorSchedule>;
export type DoctorScheduleBody = Partial<DoctorSchedule>;

export default DoctorSchedule;
