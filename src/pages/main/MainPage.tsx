import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useMemo, useState, useDeferredValue } from 'react';

import Grid from '@mui/material/Grid2';
// import Sidebar from 'components/molecules/Sidebar/Sidebar';
// import PageHeader from 'components/molecules/PageHeader/PageHeader';
import MainLayout from 'components/templates/MainLayout';
import Navbar from 'components/molecules/Navbar/NavBar';
import AppBreadcrumbs, { BreadcrumbProvider } from 'components/molecules/AppBreadcrumbs/AppBreadcrumbs';

// SERVICES
import { fetchPatients } from 'services/PatientService';

// MODELS
import Patient from 'models/accounts/Patient';
import { ObjMap } from 'constants/types';
import Department from 'models/appointment/Department';
import { fetchTDepartments } from 'services/DepartmentService';
import TimeSlot from 'models/appointment/TimeSlot';
import { fetchTimeSlots } from 'services/TimeSlotService';
import PageSkeleton from 'components/molecules/PageSkeleton/PageSkeleton';

// const temp = Array.from({ length: 100 }, (_, i) => i);

const MainPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [patientsMap, setPatientsMap] = useState<ObjMap<Patient>>({});
  const [departmentsMap, setDepartmentsMap] = useState<ObjMap<Department>>({});
  const [departments, setDepartments] = useState<Department[]>([]);
  const [timeSlotMap, setTimeSlotMap] = useState<ObjMap<TimeSlot>>({});

  const departmentsLength = useDeferredValue(departments.length);

  useEffect(() => {
    (async () => {
      const res = await fetchPatients();
      // const doctors = await fetchDoctors();
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
    if (location.pathname == '/') {
      navigate('reservations');
    }
  }, [location]);

  const departmentOptions = useMemo(() => {
    return departments.map(item => ({
      label: item.name,
      value: item.id,
    }));
  }, [departments]);

  return (
    <Grid height="100vh" container>
      {/* <Grid size={2}>
        <Sidebar />
      </Grid> */}

      <Grid size="grow" height="100%">
        <BreadcrumbProvider>
          <MainLayout rowGap={2}>
            <Navbar />
            <AppBreadcrumbs />
            {/* <Grid flex={1} overflow="auto">
            {temp.map(item => (
              <div>{item}</div>
            ))}
          </Grid> */}
            {departmentsLength ? (
              <Outlet
                context={{
                  patientsMap,
                  departmentsMap,
                  timeSlotMap,
                  departments,
                  departmentOptions,
                }}
              />
            ) : (
              <PageSkeleton />
            )}
          </MainLayout>
        </BreadcrumbProvider>
      </Grid>
    </Grid>
  );
};

export default MainPage;
