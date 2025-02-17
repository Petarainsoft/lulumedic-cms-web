import { useOutletContext, useParams } from 'react-router-dom';

import RegisterForm from '../form/RegisterForm';
import { ObjMap } from 'constants/types';
import Doctor from 'models/accounts/Doctor';
import { useBreadcrumbsContext } from 'components/molecules/AppBreadcrumbs/AppBreadcrumbs';
import { useLayoutEffect } from 'react';
import Department from 'models/appointment/Department';

const RegisterPanel = () => {
  const params = useParams();
  const id = params?.id;
  const { doctorsMap, departmentsMap } = useOutletContext<{
    doctorsMap: ObjMap<Doctor>;
    departmentsMap: ObjMap<Department>;
  }>();
  const { subBreadcrumbs, setSubBreadcrumbs } = useBreadcrumbsContext();

  const detail = id ? doctorsMap[id] : undefined;

  useLayoutEffect(() => {
    if (detail && !subBreadcrumbs) {
      setSubBreadcrumbs(`${departmentsMap[detail.departmentId!]?.name}-${detail.name}`);
    }

    return () => {
      console.log(123);
      // setSubBreadcrumbs('');
    };
  }, [detail, subBreadcrumbs]);

  return <RegisterForm doctorDetail={detail} />;
};

export default RegisterPanel;
