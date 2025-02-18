import { ID, Obj } from 'constants/types';
import DataModel from 'models/base/DataModel';

// "cancellationAvailableDates": 3,
// "autoConfirmReservation": true,
// "exposure": true,
// "treatmentCriteriaNumberOfPeople": 16,
// "treatmentCriteriaTimes": 35,
class Doctor extends DataModel<Doctor> {
  name?: string;
  position?: string;
  degree?: number;
  specialty?: string;
  departmentId?: ID;
  reservationAvailableDates?: number;
  cancellationAvailableDates?: number;
  exposure?: boolean;
  treatmentCriteriaNumberOfPeople?: number;
  treatmentCriteriaTimes?: number;

  constructor(payload: Obj) {
    super();

    if (payload) {
      this.init(payload);
    }
  }

  toBody(): DoctorBody {
    return {
      name: this.name,
      position: this.position,
      degree: this.degree,
      specialty: this.specialty,
      departmentId: this.departmentId,
      reservationAvailableDates: this.reservationAvailableDates,
      cancellationAvailableDates: this.cancellationAvailableDates,
      exposure: this.exposure,
      treatmentCriteriaNumberOfPeople: this.treatmentCriteriaNumberOfPeople,
      treatmentCriteriaTimes: this.treatmentCriteriaTimes,
    };
  }
}

export type DoctorDto = Partial<Doctor>;
export type DoctorBody = Partial<Doctor>;

export default Doctor;
