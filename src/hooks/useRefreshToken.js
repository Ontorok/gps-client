import { useDispatch } from 'react-redux';
import { setAuthUser, updateAccessToken } from 'redux/actions/Auth';
import { axiosInstance } from '../services/auth/jwt/config';

export const useRefreshToken = () => {
  const dispatch = useDispatch();
  const refresh = async () => {
    try {
      const res = await axiosInstance.get('/auth/refresh', {
        withCredentials: true
      });
      const accessToken = res.data.accessToken;

      dispatch(updateAccessToken(accessToken));
      return accessToken;
    } catch (err) {
      dispatch(updateAccessToken(''));
      dispatch(setAuthUser(null));
    }
  };
  return refresh;
};
