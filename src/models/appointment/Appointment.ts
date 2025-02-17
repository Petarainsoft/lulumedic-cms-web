import { ID, Obj } from 'constants/types';
import { STATUS_TYPE } from 'core/enum';
import DataModel from 'models/base/DataModel';

class Appointment extends DataModel<Appointment> {
  timeslotId?: ID;

  patientId?: ID;

  cancelReason?: string;

  status?: STATUS_TYPE;

  symptoms?: string;

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
      cancelReason: this.cancelReason,
      status: this.status,
      symptoms: this.symptoms,
    };
  }
}

export type AppointmentDto = Partial<Appointment>;
export type AppointmentBody = Partial<Appointment>;

export default Appointment;
