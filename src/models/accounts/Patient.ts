import { ID, Obj } from 'constants/types';
import { Gender, GenderLabel, Relationship, relationshipLabels } from 'core/enum';
import DataModel from 'models/base/DataModel';

class Patient extends DataModel<Patient> {
  name?: string;

  accountId?: ID;

  phone?: string;

  email?: string;

  address?: string;

  guardianId?: ID;

  guardianName?: Relationship;

  gender?: Gender;

  dateOfBirth?: string;

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
      gender: this.gender,
      dateOfBirth: this.dateOfBirth,
    };
  }

  get relationship() {
    return this.guardianName ? relationshipLabels[this.guardianName] : relationshipLabels[Relationship.Self];
  }

  get firstTimeVisit() {
    return '초진';
  }

  get genderLabel() {
    return this.gender ? GenderLabel[this.gender] : GenderLabel[Gender.OTHER];
  }
}

export type PatientDto = Partial<Patient>;
export type PatientBody = Partial<Patient>;

export default Patient;
