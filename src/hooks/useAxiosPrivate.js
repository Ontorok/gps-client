import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { privateAxiosInstance } from 'services/auth/jwt/config';
import { useRefreshToken } from './useRefreshToken';

export const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { authUser } = useSelector(({ auth }) => auth);

  useEffect(() => {
    const requestInterceptor = privateAxiosInstance.interceptors.request.use(
      config => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${authUser.accessToken}`;
        }
        return config;
      },
      error => Promise.reject(error)
    );

    const responseInterceptor = privateAxiosInstance.interceptors.response.use(
      response => response,
      async error => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return privateAxiosInstance(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      privateAxiosInstance.interceptors.request.eject(requestInterceptor);
      privateAxiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [authUser, refresh]);

  return privateAxiosInstance;
};
