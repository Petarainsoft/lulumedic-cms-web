import { ID } from 'constants/types';
import { post } from './base/BaseApi';

export const loginApi = async (payload: { username: string; password: string }) => {
  return await post<{ accessToken: string; refreshToken: string; user: { username: string; id: ID } }>(
    '/auth/login',
    payload
  );
};
