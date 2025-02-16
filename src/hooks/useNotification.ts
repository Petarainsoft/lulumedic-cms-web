import { enqueueSnackbar } from 'notistack';

const useNotification = () => {
  const onSuccess = (message: string) => {
    enqueueSnackbar(message, { variant: 'success' });
  };

  const onError = (message: string) => {
    enqueueSnackbar(message, { variant: 'error' });
  };

  const onInfo = (message: string) => {
    enqueueSnackbar(message, { variant: 'info' });
  };

  const onWarning = (message: string) => {
    enqueueSnackbar(message, { variant: 'warning' });
  };

  return {
    onSuccess,
    onError,
    onInfo,
    onWarning,
  };
};

export default useNotification;
