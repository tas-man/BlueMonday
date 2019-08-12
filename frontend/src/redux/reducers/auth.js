import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
  LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE,
  GET_SESSION_REQUEST, GET_SESSION_SUCCESS, GET_SESSION_FAILURE,
  REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE,
  UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAILURE,
} from '../constants/auth';

const initialState = {
  pending: false,
  isLoggedIn: false,
  token: '',
  sessionUser: {},
  error: null,
};

export const auth = (state = initialState, action) => {
  switch (action.type) {
    // -------- LOGIN --------
    case LOGIN_REQUEST:
      return {
        ...state,
        pending: true,
        error: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        pending: false,
        isLoggedIn: true,
        token: action.user.data.access_token,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        pending: false,
        isLoggedIn: false,
        token: null,
        error: action.error.message,
      };
    // -------- LOGIN --------
    case LOGOUT_REQUEST:
      return {
        ...state,
        pending: true,
        error: null,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        pending: false,
        isLoggedIn: false,
        token: null,
        sessionUser: {},
        error: null,
      };
    case LOGOUT_FAILURE:
      return {
        ...state,
        pending: false,
        isLoggedIn: false,
        token: null,
        sessionUser: {},
        error: action.error.message,
      };
    // -------- GET SESSION --------
    case GET_SESSION_REQUEST:
      return {
        ...state,
        pending: true,
        error: null,
      };
    case GET_SESSION_SUCCESS:
      return {
        ...state,
        pending: false,
        sessionUser: {
          ...action.user.data,
        },
        error: null,
      };
    case GET_SESSION_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.error.message,
      };
    // -------- REGISTER --------
    case REGISTER_REQUEST:
      return {
        ...state,
        pending: true,
        error: null,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        pending: false,
        sessionUser: {},
        error: null,
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        pending: false,
        sessionUser: {},
        error: action.error.message,
      };
    // -------- UPDATE USER --------
    case UPDATE_USER_REQUEST:
      return {
        ...state,
        pending: true,
        error: null,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        sessionUser: action.user.data,
        pending: false,
        error: null,
      };
    case UPDATE_USER_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.error.message,
      };
    default:
      return state;
  }
};

export const getLoginPending = state => state.auth.pending;
export const getLoginStatus = state => state.auth.isLoggedIn;
export const getToken = state => state.auth.token;
export const getSessionUser = state => state.auth.sessionUser;
export const getLoginError = state => state.auth.error;
