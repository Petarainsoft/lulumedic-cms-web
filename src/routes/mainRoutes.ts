import { RouteObject } from 'react-router-dom';

export enum MAIN_PATH {
  MAIN = '/',
  DOCTOR_MANAGEMENT = 'doctors',
  DOCTOR_CREATE = 'create',
  DOCTOR_SCHEDULES = 'schedules',
}

const mainRoutes: RouteObject[] = [
  {
    path: MAIN_PATH.DOCTOR_MANAGEMENT,
    lazy: () => import('pages/main/DoctorManagement/DoctorManagementPage'),
    children: [
      {
        path: '',
        index: true,
        lazy: () => import('pages/main/DoctorList/DoctorListPage'),
      },
      {
        path: `${MAIN_PATH.DOCTOR_CREATE}/:id?`,
        lazy: () => import('pages/main/DoctorRegister/DoctorRegisterPage'),
      },
      {
        path: MAIN_PATH.DOCTOR_SCHEDULES,
        lazy: () => import('pages/main/DoctorSchedule/DoctorSchedulePage'),
      },
    ],
  },
];

export default mainRoutes;
