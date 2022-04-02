export const UPDATE_AUTH_USER = 'UPDATE_AUTH_USER';
export const UPDATE_LOAD_USER = 'UPDATE_LOAD_USER';


const INIT_STATE = {
  authUser: null,
  loadUser: false
}

const authReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case UPDATE_AUTH_USER: {
      return {
        ...state,
        authUser: action.payload,
        loadUser: true
      };
    }
    case UPDATE_LOAD_USER: {
      return {
        ...state,
        loadUser: action.payload
      };
    }

    default:
      return state;
  }
}

export default authReducer