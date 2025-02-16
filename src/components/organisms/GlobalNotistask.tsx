import { EnqueueSnackbar, SnackbarProvider, SnackbarProviderProps } from 'notistack';

// HOOKS
// import { useMount } from 'hooks/effect';

export type PushNotificationProps = {
  message: Parameters<EnqueueSnackbar>[0];
  options: Parameters<EnqueueSnackbar>[1];
};

// export let pushNotification: EnqueueSnackbar = () => '';

const Notitask = () => {
  // const { enqueueSnackbar } = useSnackbar();

  // useMount(() => {
  //   pushNotification = enqueueSnackbar;
  // });

  return null;
};

export type GlobalNotistaskProps = Pick<
  SnackbarProviderProps,
  | 'dense'
  | 'maxSnack'
  | 'anchorOrigin'
  | 'autoHideDuration'
  | 'disableWindowBlurListener'
  | 'transitionDuration'
  | 'preventDuplicate'
  | 'hideIconVariant'
>;

const GlobalNotistask = (props: GlobalNotistaskProps) => (
  <SnackbarProvider {...props}>
    <Notitask />
  </SnackbarProvider>
);

GlobalNotistask.defaultProps = {
  maxSnack: 5,
  autoHideDuration: 3000,
};

export default GlobalNotistask;
