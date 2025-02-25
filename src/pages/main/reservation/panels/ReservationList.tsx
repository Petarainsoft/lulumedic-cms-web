import { useDeferredValue, useEffect, useLayoutEffect, useMemo, useRef, useState, useTransition } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';

import { dayjs } from 'utils/dateTime';
import { GridColDef, GridPaginationModel, useGridApiRef } from '@mui/x-data-grid';
import Grid from '@mui/material/Grid2';
import Filter from './Filter';
import DataTable from 'components/organisms/DataTable';

// SERVICES
import { fetchReservations, SearchFilter } from 'services/ReservationService';

import { ObjMap } from 'constants/types';

// MODELS
import TimeSlot from 'models/appointment/TimeSlot';
import Patient from 'models/accounts/Patient';
import Appointment from 'models/appointment/Appointment';
import Department from 'models/appointment/Department';

import { ReservationKeywordType, ReservationPeriod, ReservationStatusLabel, STATUS_TYPE } from 'core/enum';
import { useQueryElementTable } from 'hooks';

export type GirdColDefColId = GridColDef & {
  columnId?: string;
};

const ReservationList = ({ className }: { className?: string }) => {
  const [cachedTableWidth, setCachedTableWidth] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 30,
    count: 0,
  });
  const tableWidthAfterResizeFinal = useDeferredValue(cachedTableWidth);
  const searchValues = useRef<SearchFilter | undefined>({});

  const apiRef = useGridApiRef();
  const [reservations, setReservations] = useState<Appointment[]>([]);
  const [loading, setTransition] = useTransition();
  const { tableWrapperRef, setCurrentTableWidth, tableWidth, forceAddColumnWidth } = useQueryElementTable();
  const { patientsMap, departmentsMap, timeSlotMap } = useOutletContext<{
    patientsMap: ObjMap<Patient>;
    departmentsMap: ObjMap<Department>;
    timeSlotMap: ObjMap<TimeSlot>;
  }>();
  const navigate = useNavigate();
  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: 'patientId',
        headerName: '환자번호',
        minWidth: 80,
      },
      {
        field: 'id', // reservationNumber
        headerName: '예약번호',
        minWidth: 80,
      },
      {
        field: 'firstTimeVisit',
        headerName: '초재진 구분',

        renderCell: ({ row }) => {
          return patientsMap[row?.patientId]?.firstTimeVisit;
        },
        // width: 230,
      },
      {
        field: 'patientName',
        headerName: '이름',
        minWidth: 80,
      },
      {
        field: 'birthDate',
        headerName: '생년월일',
        minWidth: 120,
        renderCell: ({ row }) => {
          return patientsMap[row?.patientId]?.dateOfBirth;
        },
        // width: 230,
      },
      {
        field: 'phone',
        headerName: '연락처',
        minWidth: 140,
      },
      {
        field: 'createdAt', // make appointment date
        headerName: '진료예약',
        minWidth: 150,
        valueFormatter: (value: string) => dayjs(value).format('YYYY-MM-DD HH:mm:ss'),
      },
      {
        field: 'departmentName',
        headerName: '진료과',
        minWidth: 100,
      },
      {
        field: 'doctorName',
        headerName: '담당의사',
        minWidth: 100,
      },
      {
        field: 'status',
        headerName: '예약상태',
        minWidth: 80,
        valueFormatter: (value: STATUS_TYPE) => (value ? ReservationStatusLabel[value] : ''),
      },
      {
        field: 'treatmentStatusLabel',
        headerName: '진료상태',
        minWidth: 90,
      },
      {
        field: 'workingDate',
        headerName: '접수일자',
        minWidth: 140,
        flex: 1,
        valueFormatter: (value: string) => dayjs(value).format('YYYY-MM-DD HH:mm:ss'),
      },
    ],
    [reservations.length, patientsMap, departmentsMap, timeSlotMap]
  );

  const onSearch = async (payload?: SearchFilter) => {
    // handle filter

    console.log({ payload });
    // return;
    if (payload?.period == ReservationPeriod.ReceptionDate) {
      payload.startReceiptDate = payload.startDate;
      payload.endReceiptDate = payload.endDate;

      payload.startAppointmentDate = undefined;
      payload.endAppointmentDate = undefined;
    } else if (payload?.period == ReservationPeriod.ReservationDate) {
      payload.startAppointmentDate = payload.startDate;
      payload.endAppointmentDate = payload.endDate;

      payload.startReceiptDate = undefined;
      payload.endReceiptDate = undefined;
    }

    if (payload?.keywordType == ReservationKeywordType.Name) {
      payload.patientName = payload.keyword;

      payload.patientId = undefined;
      payload.patientPhone = undefined;
      payload.id = undefined;
    } else if (payload?.keywordType == ReservationKeywordType.Contact) {
      payload.patientPhone = payload.keyword;

      payload.patientId = undefined;
      payload.patientName = undefined;
      payload.id = undefined;
    } else if (payload?.keywordType == ReservationKeywordType.Appointment) {
      payload.id = payload.keyword;

      payload.patientId = undefined;
      payload.patientName = undefined;
      payload.patientPhone = undefined;
    } else if (payload?.keywordType == ReservationKeywordType.Patient) {
      payload.patientId = payload.keyword;

      payload.patientName = undefined;
      payload.patientPhone = undefined;
      payload.id = undefined;
    }

    searchValues.current = payload;

    setTransition(async () => {
      const res = await fetchReservations({
        id: payload?.id,
        departmentId: payload?.departmentId,
        status: payload?.status?.length ? payload?.status : undefined,
        patientName: payload?.patientName,
        patientPhone: payload?.patientPhone,
        patientId: payload?.patientId,
        startReceiptDate: payload?.startReceiptDate,
        endReceiptDate: payload?.endReceiptDate,
        startAppointmentDate: payload?.startAppointmentDate,
        endAppointmentDate: payload?.endAppointmentDate,
        treatmentStatus: payload?.treatmentStatus,

        page: paginationModel.page + 1,
        pageSize: paginationModel.pageSize,
      });

      if (res.data) {
        setReservations(res.data);
        setPaginationModel(prev => ({
          ...prev,
          count: res.meta.count,
        }));
      }
    });
  };

  const onHandleColumnResize = () => {
    const newWidth = apiRef.current.getAllColumns().reduce((result, current) => result + (current?.width || 0), 0);

    setCachedTableWidth(newWidth);
  };

  const onPageChange = (value: GridPaginationModel) => {
    searchValues.current = {
      ...searchValues.current,
      ...value,
    };
    setPaginationModel(prev => ({
      ...prev,
      ...value,
    }));
  };

  useEffect(() => {
    (async () => {
      await onSearch({
        ...searchValues.current,
        page: paginationModel.page,
        pageSize: paginationModel.pageSize,
      });
    })();
  }, [paginationModel.page, paginationModel.pageSize]);

  useEffect(() => {
    const parentNode = tableWrapperRef.current?.parentNode as HTMLDivElement;

    if (tableWrapperRef.current?.offsetWidth && tableWidthAfterResizeFinal <= parentNode?.offsetWidth) {
      forceAddColumnWidth(tableWidthAfterResizeFinal);
    } else {
      forceAddColumnWidth(0);
    }
  }, [tableWidthAfterResizeFinal]);

  useLayoutEffect(() => {
    if (apiRef && reservations.length) {
      apiRef.current.autosizeColumns({
        includeHeaders: true,
        includeOutliers: true,
      });
    }

    if (tableWrapperRef.current) {
      setCurrentTableWidth('.MuiDataGrid-columnHeader');
    }
  }, [apiRef, reservations.length, tableWrapperRef.current]);

  return (
    <Grid container height="100%" overflow="auto" flexDirection="column" flexWrap="nowrap" className={className}>
      <Grid size={12}>
        <Filter onFilterChange={values => onSearch(values)} />
      </Grid>
      <Grid size={12} height="100%" overflow="auto" ref={tableWrapperRef} sx={{ width: tableWidth || '100%' }}>
        <DataTable
          className="Table-list"
          paginationModel={paginationModel}
          paginationMode="server"
          rowCount={paginationModel.count}
          onColumnResize={onHandleColumnResize}
          autosizeOptions={{
            columns: [
              'patientId',
              'id',
              'firstTimeVisit',
              'patientName',
              'birthDate',
              'contact',
              'createdAt',
              'department',
              'doctorName',
              'status',
              'medicalStatus',
              'reservationTime',
            ],
          }}
          apiRef={apiRef}
          columns={columns}
          rows={reservations}
          loading={loading}
          totalRecord={paginationModel.count}
          onRowClick={val => {
            navigate(`${val.id}`);
          }}
          disableRowSelectionOnClick
          onPaginationModelChange={onPageChange}
          slots={{
            noRowsOverlay: () => (
              <div style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                예약 내역이 없습니다.
              </div>
            ),
          }}
          sortFields={[
            {
              field: 'reservationTime',
              label: '진료예약순',
              sort: 'desc',
            },
            {
              field: 'createdAt',
              label: '진료예약',
              sort: 'desc',
            },
          ]}
        />
      </Grid>
    </Grid>
  );
};

export default ReservationList;
