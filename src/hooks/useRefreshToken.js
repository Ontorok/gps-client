import { useDispatch } from 'react-redux';
import { updateAccessToken } from 'redux/actions/Auth';
import { axiosInstance } from '../services/auth/jwt/config';

export const useRefreshToken = () => {
  const dispatch = useDispatch();
  const refresh = async () => {
    const res = await axiosInstance.get('/auth/refresh', {
      withCredentials: true
    });
    const accessToken = res.data.accessToken;

    dispatch(updateAccessToken(accessToken));
    return accessToken;
  };
  return refresh;
};
