import { useEffect, useMemo, useRef, useState } from 'react';
import { useOutletContext, useNavigate, useParams } from 'react-router-dom';
import { dayjs } from 'utils/dateTime';

// COMPONENTS
import Grid from '@mui/material/Grid2';
import Information, { InfoLabel } from '../components/Information';
import Button from '@mui/material/Button';
import ConfirmDialog from 'components/molecules/Dialog';
import Dialog from 'components/molecules/Dialog';
import Select from 'components/atoms/Select';
import Typography from 'components/atoms/Typography';
import TextField from 'components/atoms/Input';
import CancelDetail from '../components/CancelDetail';

// CONSTANTS
import { ReasonType, reasonTypeOptions, ReservationStatusLabel, STATUS_TYPE } from 'core/enum';
import { ID, ObjMap } from 'constants/types';
import { MAIN_PATH } from 'routes';

// MODELS
import Appointment from 'models/appointment/Appointment';
import Patient from 'models/accounts/Patient';
import TimeSlot from 'models/appointment/TimeSlot';

// HOOKS
import useOpen from 'hooks/useOpen';
import useNotification from 'hooks/useNotification';

// SERVICES
import { fetchReservationById, updateReservationById } from 'services/ReservationService';

const DetailPanel = () => {
  const params = useParams();
  const [detail, setDetail] = useState<Appointment>();

  const navigate = useNavigate();
  const changedRefs = useRef<{ status?: STATUS_TYPE; reason?: string; reasonType?: ReasonType }>({
    status: detail?.status,
    reason: '',
  });

  const [openConfirm, confirmProps] = useOpen();
  const [openReason, reasonProps] = useOpen();
  const { onSuccess, onError } = useNotification();

  const reservationStatus = Object.keys(ReservationStatusLabel)
    .filter(item => {
      if (detail?.status === STATUS_TYPE.APPROVED) {
        return item !== STATUS_TYPE.PENDING;
      }

      return item;
    })
    .map(key => ({
      label: ReservationStatusLabel[key as keyof typeof ReservationStatusLabel],
      value: key,
    }));

  const { patientsMap, timeSlotMap } = useOutletContext<{
    patientsMap: ObjMap<Patient>;
    timeSlotMap: ObjMap<TimeSlot>;
  }>();

  useEffect(() => {
    (async () => {
      await handleGetDetail();
    })();
  }, [params]);

  const handleGetDetail = async () => {
    if (params?.id) {
      const res = await fetchReservationById(params?.id);
      setDetail(res);
    }
  };

  const handleUpdate = async () => {
    if (params?.id) {
      const rs = await updateReservationById(params.id, {
        status: changedRefs.current.status || detail?.status,
        cancelReason: changedRefs.current.reason,
        timeslotId: detail?.timeslotId,
        patientId: detail?.patientId,
      });

      if (rs) {
        handleGetDetail();
        onSuccess('업데이트됨');
      } else {
        onError('오류');
      }
      reasonProps.onClose();
      confirmProps.onClose();
    }
  };

  const handleConfirm = () => {
    if (changedRefs.current.status === STATUS_TYPE.CANCELLED) {
      openReason();
    } else {
      handleUpdate();
      // confirmProps.onClose();
    }
  };

  const getPatientInfo = (patientId?: ID, fieldName?: string) => {
    if (patientId && fieldName) {
      const value = patientsMap[patientId]![fieldName as keyof Patient];
      return value as string;
    }

    return '';
  };

  const getAppointmentDate = () => {
    if (detail?.timeslotId) {
      const workingDate = timeSlotMap?.[detail?.timeslotId]?.workingDate;
      return workingDate ? dayjs(workingDate).format('YYYY-MM-DD HH:mm') : '';
    }

    return '';
  };

  const handleSubmit = () => {
    if (detail?.status === changedRefs.current.status) {
      goBackList();
    } else {
      openConfirm();
    }
  };

  const goBackList = () => navigate(MAIN_PATH.RESERVATIONS);

  return (
    <Grid container rowGap={4} columnSpacing={2} height="100%" overflow="auto" direction="column" flexWrap="nowrap">
      {/* Patient */}
      <Information title="환자정보">
        {/* Patient number */}
        <InfoLabel label="환자번호" value={detail?.patientId} />
        {/* Name */}
        <InfoLabel label="이름" value={detail?.patientId ? patientsMap[detail?.patientId]?.name : ''} />
        {/* Birth date  */}
        <InfoLabel label="생년월일" value={detail?.patientId ? patientsMap[detail?.patientId]?.dateOfBirth : ''} />
        {/* Contact */}
        <InfoLabel label="연락처" value={detail?.patientId ? patientsMap[detail?.patientId]?.phone : ''} />

        {/* gender */}
        <InfoLabel label="성별" value={detail?.patientId ? getPatientInfo(detail?.patientId, 'genderLabel') : ''} />
        {/* relationship  */}
        <InfoLabel label="보호자 관계" value={detail?.patientId ? patientsMap[detail?.patientId]?.relationship : ''} />
      </Information>

      {/* Guardian */}
      {detail?.patientId && patientsMap[detail.patientId]?.guardianId && (
        <Information title="보호자 정보">
          {/* Name */}
          <InfoLabel
            label="이름"
            value={detail?.patientId ? getPatientInfo(patientsMap[detail.patientId]?.guardianId, 'name') : ''}
          />
          {/* Birth date */}
          <InfoLabel
            label="생년월일"
            value={detail?.patientId ? getPatientInfo(patientsMap[detail.patientId]?.guardianId, 'dateOfBirth') : ''}
          />
          {/* Contact  */}
          <InfoLabel
            label="연락처"
            value={detail?.patientId ? getPatientInfo(patientsMap[detail.patientId]?.guardianId, 'phone') : ''}
          />
        </Information>
      )}

      {/* Reservation */}
      <Information title="예약정보">
        {/* Reservation number */}
        <InfoLabel label="예약번호" value={detail?.id} />
        {/* Reception date */}
        <InfoLabel label="접수일자" value={dayjs(detail?.createdAt).format('YYYY-MM-DD HH:mm')} />

        {/* Make an appointment */}
        <InfoLabel label="진료예약" value={getAppointmentDate()} />
        {/* Department */}
        <InfoLabel label="진료과" value={detail?.departmentName || ''} />

        {/* Treatment status */}
        <InfoLabel label="진료상태" value={detail?.treatmentStatusLabel} />
        {/* First time visit */}
        <InfoLabel
          label="초재진 구분"
          value={detail?.patientId ? getPatientInfo(detail.patientId, 'firstTimeVisit') : ''}
        />

        {/* Doctor name  */}
        <InfoLabel label="담당의사" value={detail?.doctorName} />
        {/* Symptom description */}
        <InfoLabel label="증상설명" value={detail?.symptoms} />

        {/* Reservation Status */}
        <InfoLabel
          disabled={detail?.status === STATUS_TYPE.CANCELLED}
          label="예약상태"
          value={detail?.status}
          type="select"
          options={reservationStatus}
          onChange={value => (changedRefs.current.status = value as STATUS_TYPE)}
        />
        {/* Cancel date */}
        <InfoLabel
          label="취소일자"
          value={detail?.cancelledAt ? dayjs(detail?.cancelledAt).format('YYYY-MM-DD HH:mm') : ''}
        />

        {/* Reason */}
        {/* <InfoLabel label="취소사유" value={detail?.cancelReason} /> */}
        <CancelDetail cancelType={detail?.reasonType} reasonInput={detail?.cancelReason} />
      </Information>

      <Grid size={12} display="flex" justifyContent="center" columnGap={2}>
        <Button variant="outlined" sx={{ width: 120 }} onClick={goBackList}>
          리스트
        </Button>
        {detail?.status !== STATUS_TYPE.CANCELLED && (
          <Button variant="contained" sx={{ width: 120 }} onClick={handleSubmit}>
            저장
          </Button>
        )}
      </Grid>

      {/* DIALOG */}
      <ConfirmDialog buttons={[{ label: '확인', onClick: handleConfirm }]} {...confirmProps}>
        예약확정 상태로 변경 하시겠습니까?
      </ConfirmDialog>

      {/* REASON DIALOG */}
      <Dialog
        maxWidth="sm"
        title="취소 사유 입력"
        buttons={[{ label: '확인', onClick: handleUpdate }]}
        {...reasonProps}
      >
        <Grid container rowGap={2} alignItems="center" columnSpacing={2}>
          <Grid size={3}>
            <Typography>취소사유</Typography>
          </Grid>
          <Grid size={9}>
            <Select
              fullWidth
              placeholder="취소사유 선택"
              options={reasonTypeOptions}
              onChange={val => (changedRefs.current.reasonType = val as ReasonType)}
            />
          </Grid>

          <Grid size={3}>사유입력</Grid>
          <Grid size={9}>
            <TextField fullWidth multiline rows={4} onChange={val => (changedRefs.current.reason = val)} />
          </Grid>
        </Grid>
      </Dialog>
    </Grid>
  );
};

export default DetailPanel;
