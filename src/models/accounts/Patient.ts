import { ID, Obj } from 'constants/types';
import DataModel from 'models/base/DataModel';

class Patient extends DataModel<Patient> {
  name?: string;

  accountId?: ID;

  phone?: string;

  email?: string;

  address?: string;

  guardianId?: ID;

  constructor(payload: Obj) {
    super();

    if (payload) {
      this.init(payload);
    }
  }

  toBody(): PatientBody {
    return {
      name: this.name,
      accountId: this.accountId,
      phone: this.phone,
      email: this.email,
      address: this.address,
      guardianId: this.guardianId,
    };
  }
}

export type PatientDto = Partial<Patient>;
export type PatientBody = Partial<Patient>;

export default Patient;
