import { useEffect, useLayoutEffect, useState } from 'react';

import { useOutletContext, useParams } from 'react-router-dom';
import { fetchWorkingSchedulesByDoctorId } from 'services/DoctorService';
import DoctorSchedule from 'models/appointment/DoctorSchedule';
import { useBreadcrumbsContext } from 'components/molecules/AppBreadcrumbs/AppBreadcrumbs';
import { ObjMap } from 'constants/types';
import Doctor from 'models/accounts/Doctor';
import Department from 'models/appointment/Department';
import DoctorDetailPanel from './panels/DoctorDetailPanel';

const DoctorDetailPage = () => {
  const params = useParams();
  const id = params?.id;

  const [doctorSchedules, setDoctorSchedules] = useState<DoctorSchedule[]>([]);
  const { doctorsMap, departmentsMap } = useOutletContext<{
    doctorsMap: ObjMap<Doctor>;
    departmentsMap: ObjMap<Department>;
  }>();

  const { subBreadcrumbs, setSubBreadcrumbs } = useBreadcrumbsContext();
  const detail = id ? doctorsMap[id] : undefined;

  useLayoutEffect(() => {
    if (detail && !subBreadcrumbs) {
      setSubBreadcrumbs(`(${departmentsMap[detail.departmentId!]?.name} - ${detail.name})`);
    }

    return () => {
      if (subBreadcrumbs) {
        setSubBreadcrumbs('');
      }
    };
  }, [detail, subBreadcrumbs]);

  useEffect(() => {
    (async () => {
      if (id) {
        const rs = await fetchWorkingSchedulesByDoctorId(id);
        if (rs) {
          setDoctorSchedules(rs);
        }
      }
    })();
  }, []);

  return <DoctorDetailPanel doctorSchedules={doctorSchedules} />;
};

export { DoctorDetailPage as Component };
