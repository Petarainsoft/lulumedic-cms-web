import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Grid from '@mui/material/Grid2';
import Sidebar from 'components/molecules/Sidebar/Sidebar';
import PageHeader from 'components/molecules/PageHeader/PageHeader';
import MainLayout from 'components/templates/MainLayout';
import Navbar from 'components/molecules/Navbar/NavBar';
import AppBreadcrumbs from 'components/molecules/AppBreadcrumbs/AppBreadcrumbs';

// SERVICES
import { fetchPatients } from 'services/PatientService';

// MODELS
import Patient from 'models/accounts/Patient';
import { ObjMap } from 'constants/types';
import Doctor from 'models/accounts/Doctor';
import Department from 'models/appointment/Department';
import { fetchDoctors } from 'services/DoctorService';
import { fetchTDepartments } from 'services/DepartmentService';
import TimeSlot from 'models/appointment/TimeSlot';
import { fetchTimeSlots } from 'services/TimeSlotService';

// const temp = Array.from({ length: 100 }, (_, i) => i);

const MainPage = () => {
  const navigate = useNavigate();

  const [patientsMap, setPatientsMap] = useState<ObjMap<Patient>>({});
  const [doctorsMap, setDoctorsMap] = useState<ObjMap<Doctor>>({});
  const [departmentsMap, setDepartmentsMap] = useState<ObjMap<Department>>({});
  const [departments, setDepartments] = useState<Department[]>([]);
  const [timeSlotMap, setTimeSlotMap] = useState<ObjMap<TimeSlot>>({});

  useEffect(() => {
    (async () => {
      const res = await fetchPatients();
      const doctors = await fetchDoctors();
      const departments = await fetchTDepartments();
      const timeSlots = await fetchTimeSlots();

      if (timeSlots) {
        setTimeSlotMap(() => {
          return timeSlots.reduce((acc, item) => {
            acc[item.id] = item;
            return acc;
          }, {} as ObjMap<TimeSlot>);
        });
      }
      if (doctors) {
        setDoctorsMap(() => {
          return doctors.reduce((acc, item) => {
            acc[item.id] = item;
            return acc;
          }, {} as ObjMap<Doctor>);
        });
      }

      if (departments) {
        setDepartments(departments);
        setDepartmentsMap(() => {
          return departments.reduce((acc, item) => {
            acc[item.id] = item;
            return acc;
          }, {} as ObjMap<Department>);
        });
      }

      if (res) {
        setPatientsMap(() => {
          return res.reduce((acc, item) => {
            acc[item.id] = item;
            return acc;
          }, {} as ObjMap<Patient>);
        });
      }
    })();
  }, []);

  useEffect(() => {
    navigate('reservations');
  }, []);

  return (
    <Grid height="100vh" container>
      <Grid size={2}>
        <Sidebar />
      </Grid>

      <Grid size="grow" height="100%">
        <MainLayout rowGap={2} navBar={<PageHeader />}>
          <Navbar />
          <AppBreadcrumbs />
          {/* <Grid flex={1} overflow="auto">
            {temp.map(item => (
              <div>{item}</div>
            ))}
          </Grid> */}

          <Outlet context={{ patientsMap, doctorsMap, departmentsMap, timeSlotMap, departments }} />
        </MainLayout>
      </Grid>
    </Grid>
  );
};

export default MainPage;
