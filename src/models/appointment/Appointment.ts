import { ID, Obj } from 'constants/types';
import DataModel from 'models/base/DataModel';

class Appointment extends DataModel<Appointment> {
  timeslotId?: ID;

  patientId?: ID;

  constructor(payload: Obj) {
    super();

    if (payload) {
      this.init(payload);
    }
  }

  toBody(): AppointmentBody {
    return {
      timeslotId: this.timeslotId!,
      patientId: this.patientId,
    };
  }
}

export type AppointmentDto = Partial<Appointment>;
export type AppointmentBody = Partial<Appointment>;

export default Appointment;
