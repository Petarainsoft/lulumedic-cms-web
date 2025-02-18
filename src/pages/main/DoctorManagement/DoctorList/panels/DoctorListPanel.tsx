import { useNavigate, useOutletContext } from 'react-router-dom';
import { dayjs } from 'utils/dateTime';

import { GridColDef } from '@mui/x-data-grid';

import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Typography from 'components/atoms/Typography';
import Button from '@mui/material/Button';
import DataTable from 'components/organisms/DataTable';

// CONSTANTS
import { MAIN_PATH } from 'routes';
// import { doctorList } from 'core/constants';
import Doctor from 'models/accounts/Doctor';
import { ObjMap } from 'constants/types';
import Department from 'models/appointment/Department';
import { CancelPossibleValue, Exposure, ReservationPossibleValue } from 'core/enum';

const GridToolbar = ({ totalRecord }: { totalRecord: number }) => {
  return (
    <Stack alignItems="center" direction="row" my={1}>
      <Typography flex="1" color="primary" variant="titleLarge" fontWeight="bold">
        리스트 {totalRecord}
      </Typography>
      <Link to="create">
        <Button variant="contained">의사 등록</Button>
      </Link>
    </Stack>
  );
};

const DoctorListPanel = () => {
  const { doctors, departmentsMap } = useOutletContext<{ doctors: Doctor[]; departmentsMap: ObjMap<Department> }>();

  const navigate = useNavigate();
  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: '의사명',
      width: 130,
    },
    {
      field: 'departmentId',
      headerName: '진료과',
      type: 'number',
      valueGetter: value => {
        return departmentsMap[value]?.name;
      },
      width: 100,
    },
    {
      field: 'contact',
      headerName: '연락처',
      // width: 230,
    },
    {
      field: 'position',
      headerName: '포지션',
      width: 200,
    },
    {
      field: 'autoConfirmReservation', // auto confirm
      headerName: '예약확정',
      renderCell: ({ value }) => {
        return value ? '자동확정' : '';
      },
      // flex: 1,
    },
    {
      field: 'reservationAvailableDates',
      headerName: '예약 가능일',
      width: 180,
      valueFormatter: (value: number) => ReservationPossibleValue[value as keyof typeof ReservationPossibleValue],
    },
    {
      field: 'cancellationAvailableDates',
      headerName: '취소 가능일',
      valueFormatter: (value: number) => CancelPossibleValue[value as keyof typeof CancelPossibleValue],

      width: 150,
    },
    {
      field: 'exposure',
      headerName: '노출여부',
      width: 200,
      renderCell: ({ value, row }) => {
        return (
          <Stack direction="row" justifyContent="space-between" alignItems="center" height="100%">
            <Typography variant="bodyMedium">{`${value ? Exposure.Exposure : Exposure.NotExposure}`}</Typography>
            <Button
              variant="outlined"
              onClick={e => {
                e.stopPropagation();
                navigate(`${row?.id}/${MAIN_PATH.DOCTOR_SCHEDULES}`);
              }}
            >
              스케줄 관리
            </Button>
          </Stack>
        );
      },
    },
    {
      field: 'createdAt',
      headerName: '등록일자',
      valueFormatter: (value: string) => dayjs(value).format('YYYY-MM-DD HH:mm'),
      width: 130,
    },
  ];

  return (
    <DataTable
      columns={columns}
      rows={doctors}
      onRowClick={val => {
        navigate(`${val.id}`);
      }}
      slots={{
        toolbar: () => <GridToolbar totalRecord={doctors.length} />,
      }}
    />
  );
};

export default DoctorListPanel;
