// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@emotion/react';
import { dayjs } from 'utils/dateTime';
import appTheme from './theme/appTheme';
import CssBaseline from '@mui/material/CssBaseline';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import App from './App';
import GlobalNotistask from 'components/organisms/GlobalNotistask';

dayjs.locale('ko');

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <ThemeProvider theme={appTheme}>
    {/* Global reset css across browsers and devices  */}
    <CssBaseline enableColorScheme />
    <GlobalNotistask />

    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
      <App />
    </LocalizationProvider>
  </ThemeProvider>
  // </StrictMode>
);
