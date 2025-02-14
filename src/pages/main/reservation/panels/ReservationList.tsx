import { useNavigate } from 'react-router-dom';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Typography from 'components/atoms/Typography';
import Button from '@mui/material/Button';

import { reservationList } from 'core/constants';

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
      headerName: 'Patient Number',
      width: 130,
    },
    {
      field: 'reservationNumber',
      headerName: 'Reservation Number',
      type: 'number',
      width: 100,
    },
    {
      field: 'category',
      headerName: 'Category',
      // width: 230,
    },
    {
      field: 'birthDate',
      headerName: 'Birth Date',
      // width: 230,
    },
    {
      field: 'contact',
      headerName: 'Contact',
      // flex: 1,
    },
    {
      field: 'date',
      headerName: 'Date',
      width: 130,
    },
    {
      field: 'department',
      headerName: 'Department',
      width: 130,
    },
    {
      field: 'doctorName',
      headerName: 'Doctor Name',
      flex: 1,
    },
    {
      field: 'reservationStatus',
      headerName: 'Reservation Status',
      width: 130,
    },
    {
      field: 'medicalStatus',
      headerName: 'Medical Status',
      width: 130,
    },
    {
      field: 'reservationTime',
      headerName: 'Reservation Time',
      width: 130,
    },
  ];

  return (
    <DataGrid
      columns={columns}
      rows={reservationList}
      onRowClick={val => {
        // navigate(`${MAIN_PATH.DOCTOR_CREATE}/${val.id}`);
      }}
      slots={{
        toolbar: GridToolbar,
      }}
    />
  );
};

export default ReservationList;
