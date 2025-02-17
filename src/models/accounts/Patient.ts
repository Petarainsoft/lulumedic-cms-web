import { ID, Obj } from 'constants/types';
import { Relationship, relationshipLabels } from 'core/enum';
import DataModel from 'models/base/DataModel';

class Patient extends DataModel<Patient> {
  name?: string;

  accountId?: ID;

  phone?: string;

  email?: string;

  address?: string;

  guardianId?: ID;

  guardianName?: Relationship;

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
      guardianName: this.guardianName,
    };
  }

  get relationship() {
    return this.guardianName ? relationshipLabels[this.guardianName] : relationshipLabels[Relationship.Self];
  }

  get firstTimeVisit() {
    return '초진';
  }
}

export type PatientDto = Partial<Patient>;
export type PatientBody = Partial<Patient>;

export default Patient;
