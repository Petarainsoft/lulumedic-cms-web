import { RouteObject } from 'react-router-dom';

export enum MAIN_PATH {
  MAIN = '/',
  DOCTOR_MANAGEMENT = 'doctors',
  DOCTOR_CREATE = 'create',
  DOCTOR_SCHEDULES = 'schedules',

  RESERVATIONS = 'reservations',
  RESERVATION_DETAIL = 'reservations-detail',
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
        path: `:id/${MAIN_PATH.DOCTOR_SCHEDULES}`,
        lazy: () => import('pages/main/DoctorSchedule/DoctorSchedulePage'),
      },

      {
        // path: `${MAIN_PATH.RESERVATION_DETAIL}/:id`,
        // lazy: () => import('pages/main/reservation/ReservationDetailPage'),
      },
    ],
  },

  // Reservation
  {
    path: MAIN_PATH.RESERVATIONS,
    lazy: () => import('pages/main/reservation/ReservationPage'),
  },
];

export default mainRoutes;
