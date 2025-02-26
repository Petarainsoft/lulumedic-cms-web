import { useEffect, useLayoutEffect } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import * as yup from 'yup';

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

  const schema = yup
    .object()
    .shape({
      name: yup
        .string()
        .required('의사명을 입력해 주세요.')
        .min(2, '의사명은 한글,영문,특수문자 포함 최소 2자, 최대 20자 까지 입력해 주세요')
        .max(20, '의사명은 한글,영문,특수문자 포함 최소 2자, 최대 20자 까지 입력해 주세요'),
      phone: yup
        .string()
        .required('연락처를 입력해 주세요.')
        .min(2, '연락처는 숫자 최소 2자, 최대 20자 까지 입력해 주세요.')
        .max(20, '연락처는 숫자 최소 2자, 최대 20자 까지 입력해 주세요.'),
      position: yup.string().required('포지션을 입력해 주세요').min(2).max(100),
      degree: yup.string().required('사번 입력해 주세요.'),
      specialty: yup.string().required(),
      departmentId: yup.string().required('진료과를 선택해 주세요.'),
      reservationAvailableDates: yup.number().required('진료예약 설정을 선택해 주세요.'),
      cancellationAvailableDates: yup.number().required('진료예약 취소를 선택해 주세요.'),
      // exposure: yup.boolean().required(),
      treatmentCriteriaNumberOfPeople: yup.number().required('진료기준을 선택해 주세요.'),
      treatmentCriteriaTimes: yup.number().required('진료기준을 선택해 주세요.'),
      // autoConfirmReservation: yup.boolean().required('진료예약 취소를 선택해 주세요.'),
    })
    .required();

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

    if (detail?.id) {
      res = await updateDoctorById(detail.id!, new Doctor(values).toBody());
    } else {
      res = await createDoctor(new Doctor(values).toBody());
    }

    if (res) {
      onSuccess('성공');
      navigate(`/${MAIN_PATH.DOCTOR_MANAGEMENT}`);
    } else {
      onError('오류');
    }
  };

  return (
    <Form defaultValues={detail?.toDto()} schema={schema} onSubmit={onSubmit}>
      <RegisterForm doctorDetail={detail?.toDto()} />
    </Form>
  );
};

export default RegisterPanel;
