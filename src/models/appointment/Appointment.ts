import { ID, Obj } from 'constants/types';
import { ReasonType, STATUS_TYPE, TreatmentStatusLabel } from 'core/enum';
import DataModel from 'models/base/DataModel';

class Appointment extends DataModel<Appointment> {
  timeslotId?: ID;
  patientId?: ID;
  cancelReason?: string;
  status?: STATUS_TYPE;
  symptoms?: string;
  treatmentStatus?: '';
  cancelledBy?: ID;
  patientName?: string;
  departmentName?: string;
  location?: string;
  doctorName?: string;
  workingDate?: string;
  cancelledAt?: string;
  phone?: string;
  guardianName?: string;
  guardianId?: ID;
  reasonType?: ReasonType;
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
      treatmentStatus: this.treatmentStatus,
      cancelledBy: this.cancelledBy,
      patientName: this.patientName,
      departmentName: this.departmentName,
      location: this.location,
      doctorName: this.doctorName,
      workingDate: this.workingDate,
      cancelledAt: this.cancelledAt,
      phone: this.phone,
      guardianName: this.guardianName,
      guardianId: this.guardianId,
    };
  }

  get treatmentStatusLabel() {
    return this.treatmentStatus ? TreatmentStatusLabel[this.treatmentStatus] : 'N/A';
  }
}

export type AppointmentDto = Partial<Appointment>;
export type AppointmentBody = Partial<Appointment>;

export default Appointment;
