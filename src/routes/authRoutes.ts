import { RouteObject } from 'react-router-dom';

export enum AUTH_PATH {
  AUTH = 'auth',
  LOGIN = 'login',
}

const authRoute: RouteObject[] = [
  {
    path: AUTH_PATH.LOGIN,
    // index: true,
    lazy: () => import('pages/auth/LoginPage'),
  },
];

export default authRoute;
