import { useNavigate } from 'react-router-dom';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Typography from 'components/atoms/Typography';
import Button from '@mui/material/Button';

// CONSTANTS
import { MAIN_PATH } from 'routes';
import { doctorList } from 'core/constants';

const GridToolbar = () => {
  return (
    <Stack alignItems="center" direction="row" my={1}>
      <Typography flex="1" color="primary" variant="titleLarge">
        Match 0
      </Typography>
      <Link to="create">
        <Button variant="contained">Register</Button>
      </Link>
    </Stack>
  );
};

const DoctorListPanel = () => {
  const navigate = useNavigate();
  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      width: 130,
    },
    {
      field: 'department',
      headerName: 'Department',
      type: 'number',
      width: 100,
    },
    {
      field: 'contact',
      headerName: 'Contact',
      width: 230,
    },
    {
      field: 'position',
      headerName: 'Position',
      width: 230,
    },
    {
      field: 'reservationStatus',
      headerName: 'Reservation Status',
      // flex: 1,
    },
    {
      field: 'availableDate',
      headerName: 'Available Date',
      width: 130,
    },
    {
      field: 'cancelDate',
      headerName: 'Cancel Date',
      width: 130,
    },
    {
      field: 'medicalCondition',
      headerName: 'Medical condition',
      flex: 1,
      renderCell: ({ value }) => {
        return (
          <Stack direction="row" justifyContent="space-evenly" alignItems="center" height="100%">
            <Typography variant="bodyMedium">{value}</Typography>
            <Button
              variant="outlined"
              onClick={e => {
                e.stopPropagation();
                navigate(`${MAIN_PATH.DOCTOR_SCHEDULES}`);
              }}
            >
              스케줄 관리
            </Button>
          </Stack>
        );
      },
    },
    {
      field: 'registerDate',
      headerName: 'Register Date',
      width: 130,
    },
  ];

  return (
    <DataGrid
      columns={columns}
      rows={doctorList}
      onRowClick={val => {
        navigate(`${MAIN_PATH.DOCTOR_CREATE}/${val.id}`);
      }}
      slots={{
        toolbar: GridToolbar,
      }}
    />
  );
};

export default DoctorListPanel;
