import { createContext, PropsWithChildren, useContext, useMemo, useState } from 'react';

import Doctor from 'models/accounts/Doctor';
import { ObjMap } from 'constants/types';

const AppContext = createContext<{
  doctors: Doctor[];
  doctorsMap: ObjMap<Doctor>;
  setDoctors: (doctors: Doctor[]) => void;
  setDoctorsMap: (doctors: ObjMap<Doctor>) => void;
}>({
  doctors: [],
  doctorsMap: {},
  setDoctors: () => {},
  setDoctorsMap: () => {},
});

const AppProvider = ({ children }: PropsWithChildren) => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [doctorsMap, setDoctorsMap] = useState<ObjMap<Doctor>>({});

  const values = useMemo(() => {
    return {
      doctors,
      doctorsMap,
      setDoctors: (value: Doctor[]) => setDoctors(value),
      setDoctorsMap: (value: ObjMap<Doctor>) => setDoctorsMap(value),
    };
  }, [doctors]);

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);

export default AppProvider;
