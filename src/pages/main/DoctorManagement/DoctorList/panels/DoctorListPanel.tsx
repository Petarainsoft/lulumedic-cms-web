import { useNavigate, useOutletContext } from 'react-router-dom';
import { dayjs } from 'utils/dateTime';

import { GridColDef, useGridApiRef } from '@mui/x-data-grid';

import Stack from '@mui/material/Stack';
import Typography from 'components/atoms/Typography';
import Button from '@mui/material/Button';
import DataTable from 'components/organisms/DataTable';

// CONSTANTS
// import { MAIN_PATH } from 'routes';
// import { doctorList } from 'core/constants';
import { ObjMap } from 'constants/types';
import Department from 'models/appointment/Department';
import { CancelPossibleValue, Exposure, EXPOSURE_LABELS, ReservationPossibleValue } from 'core/enum';
import Doctor from 'models/accounts/Doctor';
import { useQueryElementTable } from 'hooks';
import { useDeferredValue, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import Grid from '@mui/material/Grid2';

type Props = {
  doctorList: Doctor[];
  loading?: boolean;
};
const DoctorListPanel = ({ doctorList, loading }: Props) => {
  const apiRef = useGridApiRef();
  const [cachedTableWidth, setCachedTableWidth] = useState(0);

  const tableWidthAfterResizeFinal = useDeferredValue(cachedTableWidth);

  const { tableWrapperRef, setCurrentTableWidth, tableWidth, forceAddColumnWidth } = useQueryElementTable();

  const { departmentsMap } = useOutletContext<{ departmentsMap: ObjMap<Department> }>();

  const navigate = useNavigate();
  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: 'name',
        headerName: '의사명',
        minWidth: 100,
      },
      {
        field: 'departmentId',
        headerName: '진료과',
        minWidth: 100,
        valueGetter: value => {
          return departmentsMap[value]?.name;
        },
      },
      {
        field: 'contact',
        headerName: '연락처',
        minWidth: 100,
      },
      {
        field: 'position',
        headerName: '포지션',
        minWidth: 150,
      },
      {
        field: 'autoConfirmReservation', // auto confirm
        headerName: '예약확정',
        minWidth: 100,
        renderCell: ({ value }) => {
          return value ? '자동확정' : '';
        },
      },
      {
        field: 'reservationAvailableDates',
        headerName: '예약 가능일',
        minWidth: 180,

        valueFormatter: (value: number) => ReservationPossibleValue[value as keyof typeof ReservationPossibleValue],
      },
      {
        field: 'cancellationAvailableDates',
        headerName: '취소 가능일',
        minWidth: 180,

        valueFormatter: (value: number) => CancelPossibleValue[value as keyof typeof CancelPossibleValue],
      },
      {
        field: 'exposure',
        headerName: '노출여부',
        minWidth: 180,

        renderCell: ({ value, row }) => {
          return (
            <Stack direction="row" justifyContent="space-between" alignItems="center" height="100%" columnGap={2}>
              <Typography variant="bodyMedium">{`${value ? EXPOSURE_LABELS[Exposure.Exposure] : EXPOSURE_LABELS[Exposure.NotExposure]}`}</Typography>
              <Button
                variant="outlined"
                onClick={e => {
                  e.stopPropagation();
                  navigate(`${row?.id}?tab=schedule`);
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
        minWidth: 150,
        flex: 1,
        valueFormatter: (value: string) => dayjs(value).format('YYYY-MM-DD HH:mm:ss'),
      },
    ],
    [doctorList.length]
  );

  const onHandleColumnResize = () => {
    const newWidth = apiRef.current.getAllColumns().reduce((result, current) => result + (current?.width || 0), 0);
    setCachedTableWidth(newWidth);
  };

  useEffect(() => {
    const parentNode = tableWrapperRef.current?.parentNode as HTMLDivElement;

    if (tableWrapperRef.current?.offsetWidth && tableWidthAfterResizeFinal <= parentNode.offsetWidth) {
      forceAddColumnWidth(tableWidthAfterResizeFinal);
    } else {
      forceAddColumnWidth(0);
    }
  }, [tableWidthAfterResizeFinal]);

  useLayoutEffect(() => {
    if (apiRef && doctorList.length) {
      apiRef.current.autosizeColumns({
        includeHeaders: true,
        includeOutliers: true,
      });
    }

    if (tableWrapperRef.current) {
      setCurrentTableWidth('.MuiDataGrid-columnHeader');
    }
  }, [apiRef, doctorList.length, tableWrapperRef.current]);

  return (
    <Grid ref={tableWrapperRef} height="100%" overflow="auto" sx={{ width: tableWidth || '100%' }}>
      <DataTable
        onColumnResize={onHandleColumnResize}
        autosizeOptions={{
          columns: [
            'name',
            'departmentId',
            'contact',
            'position',
            'autoConfirmReservation',
            'reservationAvailableDates',
            'cancellationAvailableDates',
            'exposure',
            'createdAt',
          ],
        }}
        apiRef={apiRef}
        columns={columns}
        rows={doctorList}
        loading={loading}
        totalRecord={doctorList.length}
        disableRowSelectionOnClick
        onRowClick={val => {
          navigate(`${val.id}`);
        }}
      />
    </Grid>
  );
};

export default DoctorListPanel;
