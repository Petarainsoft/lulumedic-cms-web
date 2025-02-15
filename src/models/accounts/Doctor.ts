import { ID, Obj } from 'constants/types';
import DataModel from 'models/base/DataModel';

class Doctor extends DataModel<Doctor> {
  name?: string;
  position?: string;
  degree?: number;
  specialty?: string;
  departmentId?: ID;

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
    };
  }
}

export type DoctorDto = Partial<Doctor>;
export type DoctorBody = Partial<Doctor>;

export default Doctor;
