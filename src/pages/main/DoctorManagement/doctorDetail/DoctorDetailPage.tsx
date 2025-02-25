import { useEffect, useState } from 'react';

import { useOutletContext, useParams } from 'react-router-dom';
import { fetchWorkingSchedulesByDoctorId, findDoctorById } from 'services/DoctorService';
import DoctorSchedule from 'models/appointment/DoctorSchedule';
import { useBreadcrumbsContext } from 'components/molecules/AppBreadcrumbs/AppBreadcrumbs';
import { ObjMap } from 'constants/types';
import Doctor from 'models/accounts/Doctor';
import Department from 'models/appointment/Department';
import DoctorDetailPanel from './panels/DoctorDetailPanel';

const DoctorDetailPage = () => {
  const params = useParams();
  const id = params?.id;
  const [detail, setDetail] = useState<Doctor | undefined>(undefined);

  const [doctorSchedules, setDoctorSchedules] = useState<DoctorSchedule[]>([]);
  const { departmentsMap } = useOutletContext<{
    departmentsMap: ObjMap<Department>;
  }>();

  const { subBreadcrumbs, setSubBreadcrumbs } = useBreadcrumbsContext();

  useEffect(() => {
    (async () => {
      if (id) {
        const detailRes = await findDoctorById(id);
        setDetail(detailRes);
        setSubBreadcrumbs(`(${departmentsMap[detailRes.departmentId!]?.name} - ${detailRes.name})`);
      }
    })();

    return () => {
      if (subBreadcrumbs) {
        setSubBreadcrumbs('');
      }
    };
  }, [id]);

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

  if (id) {
    return detail && <DoctorDetailPanel doctorDetail={detail} doctorSchedules={doctorSchedules} />;
  }

  return <DoctorDetailPanel doctorDetail={detail} doctorSchedules={doctorSchedules} />;
};

export { DoctorDetailPage as Component };
