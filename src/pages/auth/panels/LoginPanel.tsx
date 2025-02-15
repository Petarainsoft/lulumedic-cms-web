import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import TextField from 'components/atoms/Input';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import { Image } from 'components/atoms/Image';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import logo from 'assets/logo_2.svg';

const userName = 'staff001';
const password = 'staff001';

const LoginPanel = () => {
  const navigate = useNavigate();

  const usernameRef = useRef<string>('');
  const passwordRef = useRef<string>('');

  const handleLogin = () => {
    if (usernameRef.current !== userName || passwordRef.current !== password) {
      return;
    } else {
      localStorage.setItem('accessToken', '1');
      // todo: Later will need to save refreshToken in more secure way (e.g. HTTP-only cookie)
      localStorage.setItem('refreshToken', '1');
      // todo: Later save to context
      localStorage.setItem('name', '1');
      navigate('/');
    }
  };
  return (
    <Container
      maxWidth="md"
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Paper>
        <Stack justifyContent="center" alignItems="center" p={6} rowGap={2} width="100%">
          <Image src={logo} width={200} height={60} />
          <TextField sx={{ width: 300 }} onChange={value => (usernameRef.current = value)} placeholder="아이디" />
          <TextField
            sx={{ width: 300 }}
            onChange={value => (passwordRef.current = value)}
            type="password"
            placeholder="비밀번호"
          />
          <Button variant="contained" fullWidth sx={{ mt: 3 }} onClick={handleLogin}>
            로그인
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
};

export default LoginPanel;
