import { dayjs } from 'utils/dateTime';

export const formatYearMonth = (data?: string | null) => {
  if (data) {
    return dayjs(data).format('YYYY 년 MMMM');
  }

  return dayjs().format('YYYY 년 MMMM');
};
