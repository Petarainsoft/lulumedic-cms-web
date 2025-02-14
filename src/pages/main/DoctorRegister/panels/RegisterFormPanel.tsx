import { useParams } from 'react-router-dom';

import RegisterForm from '../form/RegisterForm';
import { doctorList } from 'core/constants';
import { ID } from 'constants/types';

const RegisterPanel = () => {
  const params = useParams();
  const id = params?.id;
  const detail = doctorList.find(item => (item?.id as ID) == id);

  return <RegisterForm doctorDetail={detail} />;
};

export default RegisterPanel;
