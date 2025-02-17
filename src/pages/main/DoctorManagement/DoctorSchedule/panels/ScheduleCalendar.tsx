import { useState } from 'react';
import { dayjs } from 'utils/dateTime';
import { useSearchParams } from 'react-router-dom';

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

type Props = {
  doctorSchedules: DoctorSchedule[];
};

const ScheduleCalendar = ({ doctorSchedules }: Props) => {
  const scheduleMapByDate = doctorSchedules.reduce(
    (acc, cur) => {
      const date = cur.date || '';
      acc[date] = acc[date] || [];

      const temp = {
        startTime: dayjs(`${date} ${cur.startTime}`).format('HH:mm') || '',
        endTime: dayjs(`${date} ${cur.endTime}`).format('HH:mm') || '',
        description: '진료',
      };

      // TEST
      for (let i = 0; i <= 8; i++) {
        acc[date].push(temp);
      }

      return acc;
    },
    {} as Record<string, ScheduleData[]>
  );

  console.log({ scheduleMapByDate, doctorSchedules });

  const [searchParams] = useSearchParams();
  const view = searchParams.get('view');

  const [tabVal, setTabVal] = useState(0);

  const handleChangeTab = (_event: React.SyntheticEvent, newValue: number) => {
    setTabVal(newValue);
  };
  return (
    <TabContext value={tabVal}>
      <Grid overflow="auto" display="flex" flexDirection="column">
        <TabList onChange={handleChangeTab}>
          <Tab id="view" label="의사정보" />
          <Tab id="schedule" label="스케줄" />
        </TabList>

        <Grid overflow="auto">
          <TabPanel value={0}>
            <RegisterPanel />
          </TabPanel>
          <TabPanel value={1} sx={{ padding: 0 }}>
            <Grid rowGap={2} container display="flex" direction="row" columnGap={2} height="100%" overflow="auto">
              <Grid size={12}>
                <CalenDarFilter />
              </Grid>

              <Grid size={12} height="100%" overflow="auto">
                {view == 'weekly' ? (
                  <WeeklyCalendar currentDate={dayjs(searchParams.get('date') || undefined)} />
                ) : (
                  <MonthlyCalendar
                    currentDate={dayjs(searchParams.get('date') || undefined)}
                    scheduleMapByDate={scheduleMapByDate}
                  />
                )}
              </Grid>
            </Grid>
          </TabPanel>
        </Grid>
      </Grid>
    </TabContext>
  );
};

export default ScheduleCalendar;
