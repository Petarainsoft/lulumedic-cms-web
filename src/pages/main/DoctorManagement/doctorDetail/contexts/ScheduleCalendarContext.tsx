import { createContext, PropsWithChildren, useContext, useMemo, useState } from 'react';
import { Dayjs } from 'utils/dateTime';

export type WeeklyRange = {
  startTime?: Dayjs;
  endTime?: Dayjs;
};

const ScheduleCalendarContext = createContext<{
  weeklyRange?: WeeklyRange;
  setWeeklyRange: (data?: WeeklyRange) => void;
}>({
  weeklyRange: {},
  setWeeklyRange: () => {},
});

const ScheduleCalendarProvider = ({ children }: PropsWithChildren) => {
  const [weeklyRange, setWeeklyRange] = useState<WeeklyRange>();

  const values = useMemo(() => {
    return {
      weeklyRange,
      setWeeklyRange: (value?: WeeklyRange) => setWeeklyRange(value),
    };
  }, [weeklyRange]);

  return <ScheduleCalendarContext.Provider value={values}>{children}</ScheduleCalendarContext.Provider>;
};

export const useScheduleCalendarContext = () => useContext(ScheduleCalendarContext);

export default ScheduleCalendarProvider;
