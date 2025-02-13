import { Dayjs } from 'dayjs';

import { DateCalendar as MuiDateCalendar, DateCalendarProps } from '@mui/x-date-pickers/DateCalendar';

export type Props = DateCalendarProps<Dayjs>;

const DateCalendar = ({ className, ...rest }: Props) => {
  return (
    <MuiDateCalendar
      className={`${className} DateCalendar`}
      showDaysOutsideCurrentMonth
      fixedWeekNumber={6}
      {...rest}
    />
  );
};

export default DateCalendar;
