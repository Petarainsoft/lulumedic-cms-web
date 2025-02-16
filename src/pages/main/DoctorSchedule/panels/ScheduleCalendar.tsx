import { useState } from 'react';
import { dayjs } from 'utils/dateTime';
import { useSearchParams } from 'react-router-dom';

import MonthlyCalendar from 'components/organisms/Calendar/MonthlyCalendar';
import WeeklyCalendar from 'components/organisms/Calendar/WeeklyCalendar';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import TabList from '@mui/lab/TabList';
import TabContext from '@mui/lab/TabContext';

import Grid from '@mui/material/Grid2';
import CalenDarFilter from './CalendarFilter';
import RegisterPanel from 'pages/main/DoctorRegister/panels/RegisterFormPanel';

const ScheduleCalendar = () => {
  const [searchParams] = useSearchParams();
  const view = searchParams.get('view');

  const [tabVal, setTabVal] = useState(0);

  const handleChangeTab = (_event: React.SyntheticEvent, newValue: number) => {
    console.log({ newValue });
    setTabVal(newValue);
  };
  return (
    <TabContext value={tabVal}>
      <TabList onChange={handleChangeTab}>
        <Tab id="view" label="DoctorView" />
        <Tab id="schedule" label="Schedule" />
      </TabList>

      <TabPanel value={0}>
        <RegisterPanel />
      </TabPanel>
      <TabPanel value={1} sx={{ padding: 0 }}>
        <Grid rowGap={2} container display="flex" direction="row" columnGap={2}>
          <Grid size={12}>
            <CalenDarFilter />
          </Grid>

          <Grid size={12}>
            {view == 'weekly' ? (
              <WeeklyCalendar currentDate={dayjs(searchParams.get('date') || undefined)} />
            ) : (
              <MonthlyCalendar currentDate={dayjs(searchParams.get('date') || undefined)} />
            )}
          </Grid>
        </Grid>
      </TabPanel>
    </TabContext>
  );
};

export default ScheduleCalendar;
