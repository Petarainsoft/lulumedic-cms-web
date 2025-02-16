import axios from 'axios';
import env from 'constants/env';
import { Any } from 'constants/types';

// TODO
// import { loginApi } from 'services/AuthService';
export type AppResponse<T> = {
  data: T;
  meta: {
    count: number;
  };
  message: string;
  status?: string;
};

const axiosInstance = axios.create({
  baseURL: env.API_URI,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  },
});

axiosInstance.interceptors.response.use(
  response => response.data,
  async error => {
    return error;

    // const originalRequest = error.config;

    // if (error.status === 401) {
    //   // TODO refresh token
    //   const loginInfo = localStorage.getItem('loginInfo');
    //   if (loginInfo) {
    //     const { username, password } = JSON.parse(loginInfo);
    //     const res = await loginApi({ username, password });

    //     if (res?.data) {
    //       localStorage.setItem('accessToken', res.data.accessToken);
    //       localStorage.setItem('refreshToken', res.data.refreshToken);
    //       localStorage.setItem('name', res.data.user.username);
    //       localStorage.setItem('loginInfo', JSON.stringify({ username, password }));

    //       axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${res.data.accessToken}`;

    //       return await axiosInstance(originalRequest);
    //     } else {
    //       window.location.href = '/auth/login';
    //     }
    //   } else {
    //     window.location.href = '/auth/login';
    //   }
    // }

    // return Promise.reject(error);
  }
);

axiosInstance.interceptors.request.use(
  configs => {
    configs.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
    return configs;
  },
  error => {
    return Promise.reject(error);
  }
);

export const get = async <D>(url: string): Promise<AppResponse<D>> => {
  return await axiosInstance.get(url);
};

export const post = async <D>(url: string, payload: Any): Promise<AppResponse<D>> => {
  return await axiosInstance.post(url, payload);
};

export const put = async <D>(url: string, payload: Any): Promise<AppResponse<D>> => {
  return await axiosInstance.put(url, payload);
};

export const patch = async <D>(url: string, payload: Any): Promise<AppResponse<D>> => {
  return await axiosInstance.patch(url, payload);
};

export const del = async <D>(url: string): Promise<AppResponse<D>> => {
  return await axiosInstance.delete(url);
};
