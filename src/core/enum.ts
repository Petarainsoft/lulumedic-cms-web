export enum ReservationPossible {
  SevenDay = '치료일 7일전 예약가능',
  SixDay = '치료일 6일전 예약가능',
  FiveDay = '치료일 5일전 예약가능',
  FourDay = '치료일 4일전 예약가능',
  ThreeDay = '치료일 3일전 예약가능',
  TwoDay = '치료일 2일전 예약가능',
  OneDay = '치료일 1일전 예약가능',
  Available = '치료당일 예약가능',
}

export const reservationPossibleOptions = Object.keys(ReservationPossible).map(key => ({
  label: ReservationPossible[key as keyof typeof ReservationPossible],
  value: key,
}));

export enum CancelPossible {
  SevenDay = '진료 7일전 취소 가능',
  SixDay = '진료 6일전 취소 가능',
  FiveDay = '진료 5일전 취소 가능',
  FourDay = '진료 4일전 취소 가능',
  ThreeDay = '진료 3일전 취소 가능',
  TwoDay = '진료 2일전 취소 가능',
  OneDay = '진료 1일전 취소 가능',
  Available = '진료당일 취소 가능',
}

export const cancelPossibleOptions = Object.keys(CancelPossible).map(key => ({
  label: CancelPossible[key as keyof typeof CancelPossible],
  value: key,
}));

export enum ReservationConfirm {
  Auto = '자동확정',
  Manual = '컨펌확정',
}

export const reservationConfirmOptions = Object.keys(ReservationConfirm).map(key => ({
  label: ReservationConfirm[key as keyof typeof ReservationConfirm],
  value: key,
}));

export enum Exposure {
  Exposure = '노출',
  NotExposure = '미노출',
}

export const exposureOptions = Object.keys(Exposure).map(key => ({
  label: Exposure[key as keyof typeof Exposure],
  value: key,
}));
