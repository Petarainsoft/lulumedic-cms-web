import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import TextField from 'components/atoms/Input';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import { Image } from 'components/atoms/Image';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

// Services
import { loginApi } from 'services/AuthService';

import logo from 'assets/logo_2.svg';

const LoginPanel = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async () => {
    const res = await loginApi({
      username,
      password,
    });

    if (res?.data) {
      console.log({ res });

      localStorage.setItem('accessToken', res.data.accessToken);
      // todo: Later will need to save refreshToken in more secure way (e.g. HTTP-only cookie)
      localStorage.setItem('refreshToken', res.data.refreshToken);
      // todo: Later save to context
      localStorage.setItem('name', res.data.user.username);

      // TODO: Save to context
      localStorage.setItem('loginInfo', JSON.stringify({ username, password }));
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
          <TextField sx={{ width: 300 }} onChange={value => setUsername(value)} placeholder="아이디" />
          <TextField
            sx={{ width: 300 }}
            onChange={value => setPassword(value)}
            type="password"
            placeholder="비밀번호"
          />
          <Button variant="contained" fullWidth sx={{ mt: 3 }} onClick={handleLogin} disabled={!username || !password}>
            로그인
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
};

export default LoginPanel;
