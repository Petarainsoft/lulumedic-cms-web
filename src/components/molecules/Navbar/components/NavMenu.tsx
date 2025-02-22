import styled from '@emotion/styled';
import Stack from '@mui/material/Stack';
import { SelectProps } from 'components/atoms/Select';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { SelectOption } from 'constants/elements';
import Divider from '@mui/material/Divider';
import { Value } from 'constants/types';
import Typography from 'components/atoms/Typography';

import { useEffect, useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
type Props = SelectProps;
const NavMenu = ({ value, options, className, onChange }: Props) => {
  console.log({ options });

  const [val, setVal] = useState<Value>();

  useEffect(() => {
    console.log({ value });

    if (value) {
      setVal((options || []).find(item => item.value === value)?.label);
    }
  }, [value]);

  return (
    <Stack className={className} alignItems="center">
      <Tooltip
        disableFocusListener
        disableTouchListener
        placement="bottom"
        // open
        slots={{
          tooltip: props => {
            return <Stack sx={{ backgroundColor: 'background.paper' }} {...props} />;
          },
        }}
        title={
          <Box mt={1} minWidth={130}>
            <List disablePadding sx={{ border: 1, borderColor: 'divider', borderRadius: 2 }}>
              {(options || []).map((item: SelectOption, index) => (
                <Box>
                  <ListItem
                    key={item.value}
                    onClick={() => {
                      onChange?.(item.value);
                    }}
                    sx={{
                      cursor: item.value ? 'pointer' : 'not-allowed',
                      pointerEvents: item.value ? 'auto' : 'none',
                      bgcolor: value === item.value ? '#DEEFE9' : '',
                      '&:hover': { bgcolor: 'background.default' },
                    }}
                  >
                    <Typography sx={{}} variant="bodyMedium">
                      {item.label}
                    </Typography>
                  </ListItem>
                  {index < (options || []).length - 1 && <Divider />}
                </Box>
              ))}
            </List>
          </Box>
        }
      >
        <Stack direction="row" columnGap={1} sx={{ cursor: 'pointer' }}>
          <Typography>{val}</Typography>
          <KeyboardArrowDownIcon />
        </Stack>
      </Tooltip>
    </Stack>
  );
};

const NavMenuStyled = styled(NavMenu)`
  .MuiTooltip-tooltip {
    background-color: #fff;
  }
`;

export default NavMenuStyled;
