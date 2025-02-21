import { RouteObject } from 'react-router-dom';

export enum MAIN_PATH {
  MAIN = '/',
  DOCTOR_MANAGEMENT = 'doctors',
  DOCTOR_CREATE = 'create',
  DOCTOR_DETAIL = 'detail',

  RESERVATIONS = 'reservations',
  RESERVATION_DETAIL = 'reservations-detail',
}

export type RouterHandle = {
  title: string;
  value: string;
  crumbs: string[];
};

export const mainRoutes: RouteObject[] = [
  // Reservation
  {
    path: MAIN_PATH.RESERVATIONS,
    lazy: () => import('pages/main/reservation/ReservationPage'),
    handle: {
      title: '예약내역',
    } as RouterHandle,
    children: [
      {
        // path: '',
        index: true,
        lazy: () => import('pages/main/reservation/reservationList/ReservationListPage'),
        handle: {
          title: '예약 리스트',
          value: MAIN_PATH.RESERVATIONS,
          crumbs: ['예약내역', '예약 리스트'],
        } as RouterHandle,
      },
      {
        path: `:id`,
        handle: {
          title: '예약 상세',
          crumbs: ['예약내역', '예약 리스트', '예약 상세'],
        } as RouterHandle,
        lazy: () => import('pages/main/reservation/reservationDetail/ReservationDetailPage'),
      },
    ],
  },

  // Doctor
  {
    path: MAIN_PATH.DOCTOR_MANAGEMENT,
    handle: {
      title: '병원관리',
    } as RouterHandle,
    lazy: () => import('pages/main/DoctorManagement/DoctorManagementPage'),
    children: [
      {
        index: true,
        handle: {
          title: '의사 관리',
          value: MAIN_PATH.DOCTOR_MANAGEMENT,
          crumbs: ['병원관리', '의사 관리'],
        } as RouterHandle,
        lazy: () => import('pages/main/DoctorManagement/DoctorList/DoctorListPage'),
      },
      {
        path: MAIN_PATH.DOCTOR_CREATE,
        handle: {
          title: '의사 상세',
          crumbs: ['병원관리', '의사 관리', '의사 등록'],
        } as RouterHandle,
        lazy: () => import('pages/main/DoctorManagement/DoctorRegister/DoctorRegisterPage'),
      },
      {
        path: `:id`,
        handle: {
          title: '의사 상세',
          crumbs: ['병원관리', '의사 관리', '의사 상세'],
        } as RouterHandle,
        lazy: () => import('pages/main/DoctorManagement/doctorDetail/DoctorDetailPage'),
      },
      // {
      //   path: `:id/${MAIN_PATH.DOCTOR_DETAIL}`,
      //   handle: {
      //     title: '의사 상세',
      //     crumbs: ['병원관리', '의사 관리', '스케줄 탭'],
      //   } as RouterHandle,
      //   lazy: () => import('pages/main/DoctorManagement/doctorDetail/DoctorDetailPage'),
      // },
    ],
  },
];

export default mainRoutes;
