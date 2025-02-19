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

export const ReservationPossibleValue = {
  [7]: ReservationPossible.SevenDay,
  [6]: ReservationPossible.SixDay,
  [5]: ReservationPossible.FiveDay,
  [4]: ReservationPossible.FourDay,
  [3]: ReservationPossible.ThreeDay,
  [2]: ReservationPossible.TwoDay,
  [1]: ReservationPossible.OneDay,
  [0]: ReservationPossible.Available,
};

export const reservationPossibleOptions = Object.keys(ReservationPossibleValue).map(key => ({
  label: ReservationPossibleValue[+key as keyof typeof ReservationPossibleValue],
  value: +key,
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

export const CancelPossibleValue = {
  [7]: CancelPossible.SevenDay,
  [6]: CancelPossible.SixDay,
  [5]: CancelPossible.FiveDay,
  [4]: CancelPossible.FourDay,
  [3]: CancelPossible.ThreeDay,
  [2]: CancelPossible.TwoDay,
  [1]: CancelPossible.OneDay,
  [0]: CancelPossible.Available,
};

export const cancelPossibleOptions = Object.keys(CancelPossibleValue).map(key => ({
  label: CancelPossibleValue[+key as keyof typeof CancelPossibleValue],
  value: +key,
}));

export enum ReservationConfirm {
  Manual,
  Auto,
}

export const RESERVATION_CONFIRM_LABELS: Record<ReservationConfirm, string> = {
  [ReservationConfirm.Auto]: '자동확정',
  [ReservationConfirm.Manual]: '컨펌확정',
};

export const reservationConfirmOptions = Object.keys(RESERVATION_CONFIRM_LABELS).map(key => ({
  label: RESERVATION_CONFIRM_LABELS[key as unknown as keyof typeof RESERVATION_CONFIRM_LABELS],
  value: key,
}));

export enum Exposure {
  NotExposure,
  Exposure,
}

export const EXPOSURE_LABELS: Record<Exposure, string> = {
  [Exposure.Exposure]: '노출',
  [Exposure.NotExposure]: '미노출',
};

export const exposureOptions = Object.keys(EXPOSURE_LABELS).map(key => ({
  label: EXPOSURE_LABELS[key as unknown as keyof typeof EXPOSURE_LABELS],
  value: key,
}));

export enum STATUS_TYPE {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export const ReservationStatusLabel = {
  All: '전체',
  [STATUS_TYPE.PENDING]: '예약대기',
  [STATUS_TYPE.APPROVED]: '예약확정',
  [STATUS_TYPE.COMPLETED]: '완전한',
  [STATUS_TYPE.CANCELLED]: '예약취소',
};

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

export enum ReasonType {
  CancelOfTreatment = 'CancelOfTreatment',
  EmergencySurgery = 'EmergencySurgery',
  Other = 'Other',
}

const reasonTypeLabels = {
  [ReasonType.CancelOfTreatment]: '진료취소',
  [ReasonType.EmergencySurgery]: '응급수술',
  [ReasonType.Other]: '기타',
};

export const reasonTypeOptions = Object.keys(ReasonType).map(key => ({
  label: reasonTypeLabels[key as keyof typeof ReasonType],
  value: key,
}));

// PARENTS = 'PARENTS',
// SPOUSE = 'SPOUSE',
// CHILDREN = 'CHILDREN',
export enum Relationship {
  Self = 'Self',
  Children = 'CHILDREN',
  Parent = 'PARENTS',
  Spouse = 'SPOUSE',
}

export const relationshipLabels = {
  [Relationship.Self]: '본인',
  [Relationship.Children]: '자녀',
  [Relationship.Parent]: '부모',
  [Relationship.Spouse]: '기타',
};

export enum WORKING_TYPE {
  MEDICAL = 'MEDICAL_CONSULTATION',
  SPECIAL = 'SPECIAL_CONSULTATION',
  SURGERY = 'SURGERY',
  CONSULTATION = 'CONSULTATION',
  NO_CONSULTATION = 'NO_CONSULTATION',
}

export const WorkingTypeLabels = {
  [WORKING_TYPE.MEDICAL]: '진료',
  [WORKING_TYPE.SPECIAL]: '예외 진료',
  [WORKING_TYPE.SURGERY]: '수술',
  [WORKING_TYPE.CONSULTATION]: '진료',
  [WORKING_TYPE.NO_CONSULTATION]: '휴진',
};

export const WORKING_TYPE_COLOR = {
  [WORKING_TYPE.MEDICAL]: '#90B9F9',
  [WORKING_TYPE.SPECIAL]: '#448DFF',
  [WORKING_TYPE.SURGERY]: '#12BD7E',
  [WORKING_TYPE.NO_CONSULTATION]: '#FF7676',
  [WORKING_TYPE.CONSULTATION]: '#90B9F9',
};
