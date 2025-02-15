import { useNavigate } from 'react-router-dom';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Typography from 'components/atoms/Typography';
import Button from '@mui/material/Button';

import { reservationList } from 'core/constants';
import { MAIN_PATH } from 'routes';

const GridToolbar = () => {
  return (
    <Stack alignItems="center" direction="row" my={1}>
      <Typography flex="1" color="primary" variant="titleLarge">
        Match 0
      </Typography>
    </Stack>
  );
};

const ReservationList = () => {
  const navigate = useNavigate();
  const columns: GridColDef[] = [
    {
      field: 'patientNumber',
      headerName: '환자번호',
      width: 130,
    },
    {
      field: 'reservationNumber',
      headerName: '예약번호',
      type: 'number',
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
    },
    {
      field: 'birthDate',
      headerName: '생년월일',
      // width: 230,
    },
    {
      field: 'contact',
      headerName: '연락처',
      // flex: 1,
    },
    {
      field: 'date', // make appointment date
      headerName: '진료예약',
      width: 130,
    },
    {
      field: 'department',
      headerName: '진료과',
      width: 130,
    },
    {
      field: 'doctorName',
      headerName: '담당의사',
      flex: 1,
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
  ];

  return (
    <DataGrid
      columns={columns}
      rows={reservationList}
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
