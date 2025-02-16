import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { dayjs } from 'utils/dateTime';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Typography from 'components/atoms/Typography';
import Button from '@mui/material/Button';

// SERVICES
import { fetchReservations } from 'services/ReservationService';

import Patient from 'models/accounts/Patient';
import Appointment from 'models/appointment/Appointment';
import Department from 'models/appointment/Department';

import { MAIN_PATH } from 'routes';
import { ObjMap } from 'constants/types';
import Doctor from 'models/accounts/Doctor';
import TimeSlot from 'models/appointment/TimeSlot';

const GridToolbar = () => {
  return (
    <Stack alignItems="center" direction="row" my={1}>
      <Typography flex="1" color="primary" variant="titleLarge">
        리스트 0
      </Typography>
    </Stack>
  );
};

const ReservationList = () => {
  const [reservations, setReservations] = useState<Appointment[]>([]);

  const { patientsMap, departmentsMap, doctorsMap, timeSlotMap } = useOutletContext<{
    patientsMap: ObjMap<Patient>;
    departmentsMap: ObjMap<Department>;
    doctorsMap: ObjMap<Doctor>;
    timeSlotMap: ObjMap<TimeSlot>;
  }>();
  const navigate = useNavigate();
  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: 'patientId',
        headerName: '환자번호',
        width: 130,
      },
      {
        field: 'id', // reservationNumber
        headerName: '예약번호',
        width: 100,
      },
      {
        field: 'firstTimeVisit',
        headerName: '초재진 구분',
        // width: 230,
      },
      {
        field: 'patientName',
        headerName: '이름',
        renderCell: ({ row }) => {
          return patientsMap[row?.patientId]?.name;
        },
      },
      {
        field: 'birthDate',
        headerName: '생년월일',
        // width: 230,
      },
      {
        field: 'contact',
        headerName: '연락처',
        renderCell: ({ row }) => {
          return patientsMap[row?.patientId]?.phone;
        },
        // flex: 1,
      },
      {
        field: 'createdAt', // make appointment date
        headerName: '진료예약',
        width: 130,
        valueFormatter: (value: string) => dayjs(value).format('YYYY-MM-DD HH:mm'),
      },
      {
        field: 'department',
        headerName: '진료과',
        width: 130,
        renderCell: ({ row }) => {
          const doctorId = timeSlotMap?.[row?.timeslotId]?.doctorId;

          if (doctorId) {
            const departmentId = doctorsMap?.[doctorId]?.departmentId;

            return departmentId ? departmentsMap[departmentId!]?.name : '';
          }

          return '';
        },
      },
      {
        field: 'doctorName',
        headerName: '담당의사',
        flex: 1,
        renderCell: ({ row }) => {
          const doctorId = timeSlotMap?.[row?.timeslotId]?.doctorId;
          return doctorId ? doctorsMap[doctorId]?.name : '';
        },
      },
      {
        field: 'reservationStatus',
        headerName: '예약상태',
        width: 130,
      },
      {
        field: 'medicalStatus',
        headerName: '진료상태',
        width: 130,
      },
      {
        field: 'reservationTime',
        headerName: '접수일자',
        width: 130,
      },
    ],
    [reservations, patientsMap, departmentsMap, doctorsMap, timeSlotMap]
  );

  useEffect(() => {
    (async () => {
      const res = await fetchReservations();

      setReservations(res);
    })();
  }, []);

  return (
    <DataGrid
      columns={columns}
      rows={reservations}
      onRowClick={val => {
        navigate(`../${MAIN_PATH.RESERVATION_DETAIL}/${val.id}`);
      }}
      slots={{
        toolbar: GridToolbar,
        noRowsOverlay: () => (
          <div style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            예약 내역이 없습니다.
          </div>
        ),
      }}
    />
  );
};

export default ReservationList;
