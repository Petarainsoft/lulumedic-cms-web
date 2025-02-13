import MuiRadio, { RadioProps as MuiRadioProps } from '@mui/material/Radio';

type RadioProps = MuiRadioProps;

const Radio = ({ ...rest }: RadioProps) => {
  return <MuiRadio {...rest} />;
};

export default Radio;
