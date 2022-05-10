import { SEND_FORGET_PASSWORD_EMAIL, UPDATE_ACCESS_TOKEN, UPDATE_AUTH_USER, UPDATE_LOAD_USER } from 'constants/ActionTypes';

export const setAuthUser = user => {
  return dispatch => {
    dispatch({
      type: UPDATE_AUTH_USER,
      payload: user
    });
  };
};

export const updateLoadUser = loading => {
  return dispatch => {
    dispatch({
      type: UPDATE_LOAD_USER,
      payload: loading
    });
  };
};

export const setForgetPassMailSent = status => {
  return dispatch => {
    dispatch({
      type: SEND_FORGET_PASSWORD_EMAIL,
      payload: status
    });
  };
};

export const updateAccessToken = accessToken => {
  return dispatch => {
    dispatch({
      type: UPDATE_ACCESS_TOKEN,
      payload: accessToken
    });
  };
};
