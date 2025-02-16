import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Appointment from 'models/appointment/Appointment';
import DetailPanel from '../panels/DetailPanel';
import { fetchReservationById } from 'services/ReservationService';
const ReservationDetailPage = () => {
  const params = useParams();
  const [detail, setDetail] = useState<Appointment>();

  useEffect(() => {
    (async () => {
      if (params?.id) {
        const res = await fetchReservationById(params?.id);
        setDetail(res);
      }
    })();
  }, [params]);

  return <DetailPanel detail={detail} />;
};

export { ReservationDetailPage as Component };
