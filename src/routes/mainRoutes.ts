import { RouteObject } from 'react-router-dom';

export enum MAIN_PATH {
  MAIN = '/',
  DOCTOR_MANAGEMENT = 'doctors',
  DOCTOR_CREATE = 'create',
  DOCTOR_DETAIL = 'detail',

  RESERVATIONS = 'reservations',
  RESERVATION_DETAIL = 'reservations-detail',

  DEPARTMENT_MANAGEMENT = 'departments',
  ID_LIST_MANAGEMENT = 'id-list',
}

export type RouterHandle = {
  title: string;
  crumbs: string[];
  showInMenu?: boolean;
  path?: string;
  disabled?: boolean;
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
          crumbs: ['예약내역', '예약 리스트'],
          showInMenu: true,
          path: MAIN_PATH.RESERVATIONS,
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
          crumbs: ['병원관리', '의사 관리'],
          showInMenu: true,
          path: MAIN_PATH.DOCTOR_MANAGEMENT,
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
      // Department management
      {
        path: MAIN_PATH.DEPARTMENT_MANAGEMENT,
        handle: {
          title: '진료과 관리',
          showInMenu: true,
          disabled: true,
          // path: MAIN_PATH.DEPARTMENT_MANAGEMENT,
        } as RouterHandle,
      },
      // ID LIST
      {
        path: MAIN_PATH.ID_LIST_MANAGEMENT,
        handle: {
          title: '아이디 리스트',
          showInMenu: true,
          disabled: true,
          // path: MAIN_PATH.ID_LIST_MANAGEMENT,
        } as RouterHandle,
      },
    ],
  },
];

export default mainRoutes;
