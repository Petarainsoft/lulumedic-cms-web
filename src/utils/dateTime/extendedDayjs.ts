import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import updateLocale from 'dayjs/plugin/updateLocale';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isBetween from 'dayjs/plugin/isBetween';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import isToday from 'dayjs/plugin/isToday';
import duration from 'dayjs/plugin/duration';
import dayOfYear from 'dayjs/plugin/dayOfYear';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import weekYear from 'dayjs/plugin/weekYear';
import isoWeeksInYear from 'dayjs/plugin/isoWeeksInYear';
import isLeapYear from 'dayjs/plugin/isLeapYear';

import 'dayjs/locale/ko';

export const koreanTimeZone = 'Asia/Seoul';

// https://day.js.org/docs/en/plugin/locale-data#docsNav
dayjs.extend(localeData);
dayjs.extend(updateLocale);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(isBetween);

dayjs.extend(isToday);
dayjs.extend(duration);
dayjs.extend(dayOfYear);
dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);
dayjs.extend(isoWeeksInYear);
dayjs.extend(isLeapYear);

dayjs.updateLocale('en', {
  weekdaysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
});

dayjs.updateLocale('ko', {
  weekdaysMin: ['일', '월', '화', '수', '목', '금', '토'],
});

export const currentTimeZoneGuess = koreanTimeZone;
export type Dayjs = dayjs.Dayjs;

export default dayjs;
