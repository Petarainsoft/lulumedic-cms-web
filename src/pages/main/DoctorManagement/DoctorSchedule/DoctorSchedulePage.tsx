import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import ScheduleCalendar from './panels/ScheduleCalendar';
import { fetchWorkingSchedulesByDoctorId } from 'services/DoctorService';
import DoctorSchedule from 'models/appointment/DoctorSchedule';

const DoctorSchedulePage = () => {
  const params = useParams();
  const [doctorSchedules, setDoctorSchedules] = useState<DoctorSchedule[]>([]);

  useEffect(() => {
    (async () => {
      if (params?.id) {
        const rs = await fetchWorkingSchedulesByDoctorId(params.id);
        if (rs) {
          setDoctorSchedules(rs);
        }
      }
    })();
  }, []);

  return <ScheduleCalendar doctorSchedules={doctorSchedules} />;
};

export { DoctorSchedulePage as Component };
