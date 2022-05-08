import React from 'react';
import { fetchError, fetchStart, fetchSuccess } from 'redux/actions';
import { setAuthUser, setForgetPassMailSent, updateLoadUser } from 'redux/actions/Auth';
import { AUTH_API } from 'services/apiEndPoints';
import { axiosInstance } from './config';

const JWTAuth = {
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

  onLogin: ({ email, password }) => {
    return dispatch => {
      try {
        dispatch(fetchStart());
        axiosInstance
          .post(AUTH_API.login, {
            email: email,
            password: password
          })
          .then(({ data }) => {
            if (data.succeed) {
              localStorage.setItem('token', data.accessToken);
              axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + data.accessToken;
              dispatch(fetchSuccess());
              dispatch(JWTAuth.getAuthUser(true, data.accessToken));
            } else {
              dispatch(fetchError(data.error));
            }
          })
          .catch(function(error) {
            let errText;
            if (error?.response?.status === 400) {
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
        .post(AUTH_API.logout)
        .then(({ status, data }) => {
          if (status === 204) {
            dispatch(fetchSuccess());
            localStorage.removeItem('token');
            dispatch(setAuthUser(null));
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
    return dispatch => {
      if (!token) {
        const token = localStorage.getItem('token');
        axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + token;
      }
      dispatch(fetchStart());
      dispatch(updateLoadUser(loaded));
      axiosInstance
        .get(AUTH_API.get_me)
        .then(({ data }) => {
          if (data.user) {
            dispatch(fetchSuccess());
            dispatch(setAuthUser(data.user));
          } else {
            dispatch(updateLoadUser(true));
          }
        })
        .catch(function(error) {
          dispatch(updateLoadUser(true));
        });
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
