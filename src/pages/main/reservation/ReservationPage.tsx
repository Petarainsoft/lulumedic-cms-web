import { ObjMap } from 'constants/types';
import Patient from 'models/accounts/Patient';
import Department from 'models/appointment/Department';
import TimeSlot from 'models/appointment/TimeSlot';
import { Outlet, useOutletContext } from 'react-router-dom';
const ReservationPage = () => {
  const { patientsMap, departmentsMap, timeSlotMap, departments } = useOutletContext<{
    patientsMap: ObjMap<Patient>;
    departmentsMap: ObjMap<Department>;
    timeSlotMap: ObjMap<TimeSlot>;
    departments: Department[];
  }>();

  return <Outlet context={{ patientsMap, departmentsMap, timeSlotMap, departments }} />;
};

export { ReservationPage as Component };
