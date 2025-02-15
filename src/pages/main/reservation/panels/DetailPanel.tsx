import Grid from '@mui/material/Grid2';

import Information, { InfoLabel } from '../components/Information';
import Button from '@mui/material/Button';
import { ReservationStatus } from 'core/enum';

const reservationStatus = Object.keys(ReservationStatus)
  .map(key => ({
    label: ReservationStatus[key as keyof typeof ReservationStatus],
    value: key,
  }))
  .filter(item => item.label !== ReservationStatus.All);

const DetailPanel = () => {
  return (
    <Grid container rowGap={4} columnSpacing={2} height="100%" overflow="auto">
      {/* Patient */}
      <Information title="환자정보">
        {/* Patient number */}
        <InfoLabel label="환자번호" value="123" />
        {/* Name */}
        <InfoLabel label="이름" value="123" />
        {/* Birth date  */}
        <InfoLabel label="생년월일" value="123" />
        {/* Contact */}
        <InfoLabel label="연락처" value="123" />
      </Information>

      {/* Guardian */}
      <Information title="보호자 정보">
        {/* Name */}
        <InfoLabel label="이름" value="123" />
        {/* Birth date */}
        <InfoLabel label="생년월일" value="123" />
        {/* Contact  */}
        <InfoLabel label="연락처" value="123" />
      </Information>

      {/* Reservation */}
      <Information title="예약정보">
        {/* Reservation number */}
        <InfoLabel label="예약번호" value="123" />
        {/* Reception date */}
        <InfoLabel label="접수일자" value="123" />

        {/* Make an appointment */}
        <InfoLabel label="진료예약" value="123" />
        {/* Department */}
        <InfoLabel label="진료과" value="123" />

        {/* Treatment status */}
        <InfoLabel label="진료상태" value="123" />
        {/*  */}
        <InfoLabel label="초재진 구분" value="123" />

        {/*  */}
        <InfoLabel label="담당의사" value="123" />
        {/* Symptom description */}
        <InfoLabel label="증상설명" value="123" />

        {/* Reservation Status */}
        <InfoLabel label="예약상태" value={reservationStatus[0].value} type="select" options={reservationStatus} />
        {/* Cancel date */}
        <InfoLabel label="취소일자" value="-" />

        {/* Reason */}
        <InfoLabel label="취소사유" value="-" />
      </Information>

      <Grid size={12} display="flex" justifyContent="center" columnGap={2}>
        <Button variant="outlined" sx={{ width: 100 }}>
          리스트
        </Button>
        <Button variant="contained" sx={{ width: 100 }}>
          저장
        </Button>
      </Grid>
    </Grid>
  );
};

export default DetailPanel;
