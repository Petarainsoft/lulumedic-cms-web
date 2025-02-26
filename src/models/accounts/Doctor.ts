import { ID, Obj } from 'constants/types';
import DataModel from 'models/base/DataModel';

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
  autoConfirmReservation?: boolean;
  phone?: number;
  constructor(payload: Obj) {
    super();

    if (payload) {
      this.init(payload);
    }
  }

  toDto(): DoctorDto {
    return {
      id: this.id,
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
      autoConfirmReservation: this.autoConfirmReservation,
      phone: this.phone,
    };
  }

  toBody(): DoctorBody {
    return {
      name: this.name,
      position: this.position,
      degree: +this.degree!,
      specialty: this.specialty,
      departmentId: this.departmentId,
      reservationAvailableDates: +this.reservationAvailableDates!,
      cancellationAvailableDates: +this.cancellationAvailableDates!,
      exposure: this.exposure ?? false,
      treatmentCriteriaNumberOfPeople: +this.treatmentCriteriaNumberOfPeople!,
      treatmentCriteriaTimes: +this.treatmentCriteriaTimes!,
      autoConfirmReservation: this.autoConfirmReservation ?? false,
      phone: this.phone,
    };
  }
}

export type DoctorDto = Partial<Doctor>;
export type DoctorBody = Partial<Doctor>;

export default Doctor;
