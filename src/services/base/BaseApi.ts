import axios from 'axios';
import env from 'constants/env';
import { Any, Obj } from 'constants/types';
import qs from 'qs';
import { getNewToken } from 'services/AuthService';

export type AppResponse<T> = {
  data: T;
  meta: {
    count: number;
  };
  message: string;
  status?: string;
};

export type Pagination = {
  page?: number;
  pageSize?: number;
};

const axiosInstance = axios.create({
  baseURL: env.API_URI,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  },
});

const handleRefreshToken = async (error: Any) => {
  const originalRequest = error.config;

  // TODO refresh token
  const refreshToken = localStorage.getItem('refreshToken');
  if (refreshToken) {
    const res = await getNewToken({ refreshToken });

    if (res?.data) {
      localStorage.setItem('accessToken', res?.data.accessToken);
      localStorage.setItem('refreshToken', res?.data.refreshToken);

      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${res?.data.accessToken}`;

      return await axiosInstance(originalRequest);
    } else {
      window.location.href = '/auth/login';
      return error;
    }
  } else {
    window.location.href = '/auth/login';
    return error;
  }
};

axiosInstance.interceptors.response.use(
  response => response.data,
  async error => {
    if (error.status === 401) {
      const { status } = error.response.data;

      if (status == 'ERROR_USER_NOT_FOUND' || status == 'ERROR_WRONG_PASSWORD') {
        return error;
      } else {
        return await handleRefreshToken(error);
      }
    }
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

export const get = async <D>(url: string, queryParams?: Obj): Promise<AppResponse<D>> => {
  return await axiosInstance.get(`${url}?`, {
    params: queryParams,
    paramsSerializer: params => {
      return qs.stringify(params);
    },
  });
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
