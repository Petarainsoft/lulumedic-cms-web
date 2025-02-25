import { useLayoutEffect } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';

import { MAIN_PATH } from 'routes';
import RegisterForm from '../form/RegisterForm';
import { Obj, ObjMap } from 'constants/types';
import Doctor from 'models/accounts/Doctor';
import { useBreadcrumbsContext } from 'components/molecules/AppBreadcrumbs/AppBreadcrumbs';
import Department from 'models/appointment/Department';
import { Form } from 'components/atoms/Form';

// SERVICES
import { createDoctor, updateDoctorById } from 'services/DoctorService';
import useNotification from 'hooks/useNotification';

type Props = {
  detail?: Doctor | undefined;
};
const RegisterPanel = ({ detail }: Props) => {
  const navigate = useNavigate();
  const { onSuccess, onError } = useNotification();

  const { departmentsMap } = useOutletContext<{
    departmentsMap: ObjMap<Department>;
  }>();

  const { subBreadcrumbs, setSubBreadcrumbs } = useBreadcrumbsContext();

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

  const onSubmit = async (values: Obj) => {
    let res = {};

    // todo:
    delete values.contact;

    if (detail?.id) {
      res = await updateDoctorById(detail.id!, new Doctor(values).toBody());
    } else {
      res = await createDoctor(new Doctor(values).toBody());
      navigate(`/${MAIN_PATH.DOCTOR_MANAGEMENT}`);
    }

    if (res) {
      onSuccess('성공');
    } else {
      onError('오류');
    }
  };

  return (
    <Form defaultValues={detail?.toDto()} onSubmit={onSubmit}>
      <RegisterForm doctorDetail={detail?.toDto()} />;
    </Form>
  );
};

export default RegisterPanel;
