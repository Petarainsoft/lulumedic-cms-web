import { useOutletContext, useNavigate } from 'react-router-dom';
import { dayjs } from 'utils/dateTime';

// COMPONENTS
import Grid from '@mui/material/Grid2';
import Information, { InfoLabel } from '../components/Information';
import Button from '@mui/material/Button';
import Dialog from 'components/molecules/Dialog';
import ConfirmDialog from 'components/molecules/Dialog';

// CONSTANTS
import { ReservationStatus } from 'core/enum';
import { ID, ObjMap } from 'constants/types';
import { MAIN_PATH } from 'routes';

// MODELS
import Appointment from 'models/appointment/Appointment';
import Patient from 'models/accounts/Patient';
import Department from 'models/appointment/Department';
import Doctor from 'models/accounts/Doctor';
import TimeSlot from 'models/appointment/TimeSlot';

// HOOKS
import useOpen from 'hooks/useOpen';
import { useRef } from 'react';

const reservationStatus = Object.keys(ReservationStatus)
  .map(key => ({
    label: ReservationStatus[key as keyof typeof ReservationStatus],
    value: key,
  }))
  .filter(item => item.label !== ReservationStatus.All);

type Props = {
  detail?: Appointment;
};
const DetailPanel = ({ detail }: Props) => {
  const navigate = useNavigate();
  const statusRef = useRef('');
  const [openConfirm, confirmProps] = useOpen();
  const { patientsMap, departmentsMap, doctorsMap, timeSlotMap } = useOutletContext<{
    patientsMap: ObjMap<Patient>;
    departmentsMap: ObjMap<Department>;
    doctorsMap: ObjMap<Doctor>;
    timeSlotMap: ObjMap<TimeSlot>;
  }>();

  const getDepartment = (timeSlotId: ID) => {
    const doctorId = timeSlotMap?.[timeSlotId]?.doctorId;

    if (doctorId) {
      const departmentId = doctorsMap?.[doctorId]?.departmentId;

      return departmentId ? departmentsMap[departmentId!]?.name : '';
    }
  };

  return (
    <Grid container rowGap={4} columnSpacing={2} height="100%" overflow="auto">
      {/* Patient */}
      <Information title="환자정보">
        {/* Patient number */}
        <InfoLabel label="환자번호" value={detail?.patientId} />
        {/* Name */}
        <InfoLabel label="이름" value={detail?.patientId ? patientsMap[detail?.patientId]?.name : ''} />
        {/* Birth date  */}
        <InfoLabel label="생년월일" value="-" />
        {/* Contact */}
        <InfoLabel label="연락처" value={detail?.patientId ? patientsMap[detail?.patientId]?.phone : ''} />

        {/* gender */}
        <InfoLabel label="성별" value="-" />
        {/* relationship  */}
        <InfoLabel label="보호자 관계" value="-" />
      </Information>

      {/* Guardian */}
      <Information title="보호자 정보">
        {/* Name */}
        <InfoLabel label="이름" value="-" />
        {/* Birth date */}
        <InfoLabel label="생년월일" value="-" />
        {/* Contact  */}
        <InfoLabel label="연락처" value="-" />
      </Information>

      {/* Reservation */}
      <Information title="예약정보">
        {/* Reservation number */}
        <InfoLabel label="예약번호" value={detail?.id} />
        {/* Reception date */}
        <InfoLabel label="접수일자" value="-" />

        {/* Make an appointment */}
        <InfoLabel label="진료예약" value={dayjs(detail?.createdAt).format('YYYY-MM-DD HH:mm')} />
        {/* Department */}
        <InfoLabel label="진료과" value={getDepartment(detail?.timeslotId || '')} />

        {/* Treatment status */}
        <InfoLabel label="진료상태" value="-" />
        {/*  */}
        <InfoLabel label="초재진 구분" value="-" />

        {/*  */}
        <InfoLabel label="담당의사" value="-" />
        {/* Symptom description */}
        <InfoLabel label="증상설명" value="-" />

        {/* Reservation Status */}
        <InfoLabel
          label="예약상태"
          value={reservationStatus[0].value}
          type="select"
          options={reservationStatus}
          onChange={value => (statusRef.current = value as string)}
        />
        {/* Cancel date */}
        <InfoLabel label="취소일자" value="-" />

        {/* Reason */}
        <InfoLabel label="취소사유" value="-" />
      </Information>

      <Grid size={12} display="flex" justifyContent="center" columnGap={2}>
        <Button variant="outlined" sx={{ width: 100 }} onClick={() => navigate(MAIN_PATH.RESERVATIONS)}>
          리스트
        </Button>
        <Button variant="contained" sx={{ width: 100 }} onClick={openConfirm}>
          저장
        </Button>
      </Grid>

      {/* DIALOG */}
      <ConfirmDialog buttons={[{ label: '확인' }]} {...confirmProps}>
        예약확정 상태로 변경 하시겠습니까?
      </ConfirmDialog>
    </Grid>
  );
};

export default DetailPanel;
