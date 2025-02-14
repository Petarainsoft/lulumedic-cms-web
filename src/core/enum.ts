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

export enum ReservationStatus {
  All = '전체',
  Waiting = '예약대기',
  Confirm = '예약확정',
  Cancelled = '예약취소',
}

export enum MedicalStatus {
  All = '전체',
  Waiting = '진료대기',
  Completed = '진료완료',
  NoShow = '진료노쇼',
}

export enum ReservationPeriod {
  Category = '기간 구분',
  ReceptionDate = '접수일자',
  ReservationDate = '예약일자',
}

export const reservationPeriodOptions = Object.keys(ReservationPeriod).map(key => ({
  label: ReservationPeriod[key as keyof typeof ReservationPeriod],
  value: key,
}));

export enum ReservationKeywordType {
  Name = '이름',
  Contact = '연락처',
  Appointment = '예약번호',
  Patient = '환자번호',
}

export const reservationKeywordTypeOptions = Object.keys(ReservationKeywordType).map(key => ({
  label: ReservationKeywordType[key as keyof typeof ReservationKeywordType],
  value: key,
}));
