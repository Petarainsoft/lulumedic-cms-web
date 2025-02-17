import { ObjMap } from 'constants/types';
import Doctor from 'models/accounts/Doctor';
import Patient from 'models/accounts/Patient';
import Department from 'models/appointment/Department';
import TimeSlot from 'models/appointment/TimeSlot';
import { Outlet, useOutletContext } from 'react-router-dom';
const ReservationPage = () => {
  const { patientsMap, doctorsMap, departmentsMap, timeSlotMap, departments } = useOutletContext<{
    patientsMap: ObjMap<Patient>;
    departmentsMap: ObjMap<Department>;
    doctorsMap: ObjMap<Doctor>;
    timeSlotMap: ObjMap<TimeSlot>;
    departments: Department[];
  }>();

  return <Outlet context={{ patientsMap, doctorsMap, departmentsMap, timeSlotMap, departments }} />;
};

export { ReservationPage as Component };
