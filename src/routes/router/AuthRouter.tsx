import { PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = PropsWithChildren;

const AuthRouter = ({ children }: Props) => {
  const navigate = useNavigate();

  const isAuth = localStorage.getItem('accessToken');

  useEffect(() => {
    if (!isAuth) {
      navigate(`auth/login`);
    }
  }, [isAuth, navigate]);

  return <>{isAuth ? children : null}</>;
};

export default AuthRouter;
