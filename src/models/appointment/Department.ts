import { Obj } from 'constants/types';
import DataModel from 'models/base/DataModel';

class Department extends DataModel<Department> {
  name?: string;

  constructor(payload: Obj) {
    super();

    if (payload) {
      this.init(payload);
    }
  }

  toBody(): DepartmentBody {
    return {
      name: this.name,
    };
  }
}

export type DepartmentDto = Partial<Department>;
export type DepartmentBody = Partial<Department>;

export default Department;
