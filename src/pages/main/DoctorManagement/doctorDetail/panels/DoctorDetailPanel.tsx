import { useState } from 'react';
import { dayjs } from 'utils/dateTime';
import { useSearchParams, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

import MonthlyCalendar, { ScheduleData } from 'components/organisms/Calendar/MonthlyCalendar';
import WeeklyCalendar from 'components/organisms/Calendar/WeeklyCalendar';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import TabList from '@mui/lab/TabList';
import TabContext from '@mui/lab/TabContext';

import Grid from '@mui/material/Grid2';
import CalenDarFilter from './CalendarFilter';
import RegisterPanel from 'pages/main/DoctorManagement/DoctorRegister/panels/RegisterFormPanel';
import DoctorSchedule from 'models/appointment/DoctorSchedule';
import { Button } from '@mui/material';
import ScheduleCalendarProvider from '../contexts/ScheduleCalendarContext';
import { MAIN_PATH } from 'routes';
import Doctor from 'models/accounts/Doctor';

type Props = {
  doctorDetail?: Doctor;
  doctorSchedules: DoctorSchedule[];
  className?: string;
};

const DoctorDetailPanel = ({ doctorSchedules, doctorDetail, className }: Props) => {
  const navigate = useNavigate();

  const scheduleMapByDate = doctorSchedules.reduce(
    (acc, cur) => {
      const date = cur.date || '';
      acc[date] = acc[date] || [];

      const temp = {
        startTime: dayjs(`${date} ${cur.startTime}`),
        endTime: dayjs(`${date} ${cur.endTime}`),
        description: cur.workingType,
      };

      // TEST
      // for (let i = 0; i < 1; i++) {
      //   acc[date].push(temp);
      // }
      acc[date].push(temp);
      return acc;
    },
    {} as Record<string, ScheduleData[]>
  );

  const [searchParams] = useSearchParams();
  const view = searchParams.get('view');
  const tab = searchParams.get('tab');
  const [tabVal, setTabVal] = useState(() => {
    if (tab === 'schedule') {
      return 1;
    }

    return 0;
  });

  const handleChangeTab = (_event: React.SyntheticEvent, newValue: number) => {
    setTabVal(newValue);
  };

  return (
    <TabContext value={tabVal}>
      <Grid overflow="auto" display="flex" flexDirection="column" className={className} rowGap={2}>
        <TabList onChange={handleChangeTab}>
          <Tab id="view" label="의사정보" />
          <Tab id="schedule" label="스케줄" />
        </TabList>

        <Grid overflow="auto">
          <TabPanel value={0}>
            <RegisterPanel detail={doctorDetail} />
          </TabPanel>

          <TabPanel value={1} sx={{ padding: 0 }}>
            <Grid
              rowGap={2}
              container
              display="flex"
              flexWrap="nowrap"
              direction="row"
              columnGap={2}
              height="100%"
              overflow="auto"
              flexDirection="column"
            >
              <ScheduleCalendarProvider>
                <Grid size={12}>
                  <CalenDarFilter />
                </Grid>

                <Grid size={12} height="100%" overflow="auto">
                  {view == 'weekly' ? (
                    <WeeklyCalendar
                      currentDate={dayjs(searchParams.get('date') || undefined)}
                      scheduleMapByDate={scheduleMapByDate}
                    />
                  ) : (
                    <MonthlyCalendar
                      currentDate={dayjs(searchParams.get('date') || undefined)}
                      scheduleMapByDate={scheduleMapByDate}
                    />
                  )}
                </Grid>
              </ScheduleCalendarProvider>
            </Grid>
          </TabPanel>
        </Grid>

        {tabVal ? (
          <Grid textAlign="center">
            <Button variant="outlined" onClick={() => navigate(`/${MAIN_PATH.DOCTOR_MANAGEMENT}`)}>
              리스트 이동
            </Button>
          </Grid>
        ) : null}
      </Grid>
    </TabContext>
  );
};

const DoctorDetailPanelStyled = styled(DoctorDetailPanel)`
  .MuiTabPanel-root {
    height: 100%;
  }
`;

export default DoctorDetailPanelStyled;
