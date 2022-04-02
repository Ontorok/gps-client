import { UPDATE_AUTH_USER, UPDATE_LOAD_USER } from '../reducers/Auth';

export const setAuthUser = user => {
  return dispatch => {
    dispatch({
      type: UPDATE_AUTH_USER,
      payload: user
    })
  }
}


export const updateLoadUser = loading => {
  return dispatch => {
    dispatch({
      type: UPDATE_LOAD_USER,
      payload: loading
    });
  };
};