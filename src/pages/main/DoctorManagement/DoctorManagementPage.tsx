import { SelectOption } from 'constants/elements';
import { ObjMap } from 'constants/types';
import Doctor from 'models/accounts/Doctor';
import Patient from 'models/accounts/Patient';
import Department from 'models/appointment/Department';
import TimeSlot from 'models/appointment/TimeSlot';
import { Outlet, useOutletContext } from 'react-router-dom';

const DoctorManagementPage = () => {
  const { patientsMap, doctorsMap, departmentsMap, timeSlotMap, departments, doctors, departmentOptions } =
    useOutletContext<{
      patientsMap: ObjMap<Patient>;
      departmentsMap: ObjMap<Department>;
      doctorsMap: ObjMap<Doctor>;
      doctors: Doctor[];
      timeSlotMap: ObjMap<TimeSlot>;
      departments: Department[];
      departmentOptions: SelectOption[];
    }>();

  return (
    <Outlet
      context={{ patientsMap, doctorsMap, departmentsMap, timeSlotMap, departments, doctors, departmentOptions }}
    />
  );
};

export { DoctorManagementPage as Component };
