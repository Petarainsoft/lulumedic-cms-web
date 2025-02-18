import { useMemo } from 'react';
import { dayjs, Dayjs } from 'utils/dateTime';

const weeksInYear = dayjs().isoWeeksInYear();
const weekdays = dayjs.localeData().weekdaysShort(); // [sun, mon...]

export const StartOfWeek = weekdays[0]; // Sun
export const EndOfWeek = weekdays[weekdays.length - 1]; // Sat

const getColorDay = (date: Dayjs) => {
  switch (date.format('ddd')) {
    case '일':
      return 'error';
    default:
      return '';
  }
};

const useCalendar = (currentDate: Dayjs) => {
  const getListDaysInMonth = (currentDate: Dayjs) => {
    const daysInMonth = Array.from({ length: currentDate.daysInMonth() }, (_, i) => {
      const newDate = dayjs(currentDate).set('date', i + 1);
      // .format('YYYY-MM-DD');

      return newDate;
    });

    return daysInMonth;
  };

  const getDaysInYear = () => {
    let startOfYear = currentDate.startOf('year');
    const endOfYear = currentDate.endOf('year');
    const daysOfYear = [];

    while (startOfYear.isSameOrBefore(endOfYear)) {
      daysOfYear.push(startOfYear);
      startOfYear = startOfYear.add(1, 'day');
    }

    console.log({ daysOfYear });
    return daysOfYear;
  };

  const calendarDays = useMemo(() => {
    let daysOfPrevYear: Dayjs[] = [];
    let daysOfNextYear: Dayjs[] = [];

    const daysInYear = getDaysInYear();
    const firstDayOfYear = daysInYear[0];
    const firstDayOfYearWeekDay = dayjs(firstDayOfYear).format('ddd');

    const lastOfYear = daysInYear[daysInYear.length - 1];
    const lastDayOfYearWeekDay = dayjs(lastOfYear).format('ddd');

    if (firstDayOfYearWeekDay !== StartOfWeek) {
      const findIndex = weekdays.findIndex(item => item === firstDayOfYearWeekDay);

      // lost days
      const tempArr = weekdays.slice(0, findIndex);

      // get lasted days of previous year
      if (tempArr?.length) {
        const previousYear = dayjs(firstDayOfYear).subtract(1, 'year').set('month', 11);
        const daysInMonth = getListDaysInMonth(previousYear);
        console.log('dayOfMonth', daysInMonth);

        // get lasted days of previous year
        daysOfPrevYear = daysInMonth.slice(daysInMonth.length - tempArr.length);
      }
    }

    if (lastDayOfYearWeekDay !== EndOfWeek) {
      const findIndex = weekdays.findIndex(item => item === lastDayOfYearWeekDay);

      // lost days
      const tempArr = weekdays.slice(findIndex + 1);

      console.log(777, tempArr);

      // get lasted days of previous year
      if (tempArr?.length) {
        const nextYear = dayjs(lastOfYear).add(1, 'year').set('month', 0);
        const daysInMonth = getListDaysInMonth(nextYear);
        //   console.log('dayOfMonth', daysInMonth);
        // get first days of next year
        daysOfNextYear = daysInMonth.slice(0, tempArr.length);
        console.log({ daysOfNextYear });
      }
    }

    return daysOfPrevYear.concat(daysInYear).concat(daysOfNextYear);
  }, [currentDate]);

  const daysMapToWeeks = useMemo(() => {
    const temp = Array.from({ length: calendarDays.length / weekdays.length }, (_, i) => {
      return Array.from({ length: weekdays.length }, (_, j) => {
        return calendarDays[i * weekdays.length + j];
      });
    });

    return temp;
  }, [calendarDays]);

  console.log(105, { calendarDays, daysMapToWeeks });

  return {
    weeksInYear,
    weekdays,
    calendarDays,
    daysMapToWeeks,

    getListDaysInMonth,
    getDaysInYear,
    getColorDay,
  };
};

export default useCalendar;
