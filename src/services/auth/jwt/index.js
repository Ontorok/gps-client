import React from 'react';
import { fetchError, fetchStart, fetchSuccess } from 'redux/actions';
import { setAuthUser, setForgetPassMailSent, updateAccessToken, updateLoadUser } from 'redux/actions/Auth';
import { AUTH_API } from 'services/apiEndPoints';
import { axiosInstance } from './config';

const JWTAuth = {
  refresh: async () => {
    const res = await axiosInstance.get('/auth/refresh', { withCredentials: true });
    const accessToken = res.data.accessToken;
    return accessToken;
  },

  onRegister: ({ name, email, password }) => {
    return dispatch => {
      dispatch(fetchStart());
      axiosInstance
        .post('auth/register', {
          email: email,
          password: password,
          name: name
        })
        .then(({ data }) => {
          if (data.result) {
            localStorage.setItem('token', data.token.access_token);
            axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + data.token.access_token;
            dispatch(fetchSuccess());
            dispatch(JWTAuth.getAuthUser(true, data.token.access_token));
          } else {
            dispatch(fetchError(data.error));
          }
        })
        .catch(function(error) {
          dispatch(fetchError(error.message));
        });
    };
  },

  onLogin: ({ username, password }) => {
    return dispatch => {
      try {
        dispatch(fetchStart());
        axiosInstance
          .post(
            AUTH_API.login,
            {
              username: username,
              password: password
            },
            {
              withCredentials: true
            }
          )
          .then(({ data }) => {
            if (data.succeed) {
              dispatch(fetchSuccess());
              dispatch(JWTAuth.getAuthUser(true, data.accessToken));
              dispatch(updateAccessToken(data.accessToken));
            } else {
              dispatch(fetchError(data.error));
            }
          })
          .catch(function(error) {
            let errText;
            if (error?.response?.status === 400) {
              errText = error?.response?.data?.message;
            }
            if (error?.response?.status === 401) {
              errText = error?.response?.data?.message;
            } else {
              errText = error.message;
            }
            dispatch(fetchError(errText));
          });
      } catch (error) {
        dispatch(fetchError(error.message));
      }
    };
  },
  onLogout: () => {
    return dispatch => {
      dispatch(fetchStart());
      axiosInstance
        .post(AUTH_API.logout, {}, { withCredentials: true })
        .then(({ status, data }) => {
          if (status === 204) {
            dispatch(fetchSuccess());

            dispatch(setAuthUser(null));
            dispatch(updateAccessToken(''));
          } else {
            dispatch(fetchError(data.error));
          }
        })
        .catch(function(error) {
          dispatch(fetchError(error.message));
        });
    };
  },

  getAuthUser: (loaded = false, token) => {
    return async dispatch => {
      try {
        let newAt;
        if (!token) {
          newAt = await JWTAuth.refresh();
          dispatch(updateAccessToken(newAt));
        }
        dispatch(fetchStart());
        dispatch(updateLoadUser(loaded));
        const res = await axiosInstance.get(AUTH_API.get_me, {
          headers: {
            Authorization: `Bearer ${token || newAt}`
          }
        });
        if (res.data.user) {
          dispatch(fetchSuccess());
          dispatch(setAuthUser(res.data.user));
        } else {
          dispatch(updateLoadUser(true));
        }
      } catch (error) {
        dispatch(updateLoadUser(true));
      }
    };
  },

  onForgotPassword: () => {
    return dispatch => {
      dispatch(fetchStart());

      setTimeout(() => {
        dispatch(setForgetPassMailSent(true));
        dispatch(fetchSuccess());
      }, 300);
    };
  },
  getSocialMediaIcons: () => {
    return <React.Fragment> </React.Fragment>;
  }
};

export default JWTAuth;
