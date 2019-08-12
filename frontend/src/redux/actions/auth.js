import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
  LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE,
  GET_SESSION_REQUEST, GET_SESSION_SUCCESS, GET_SESSION_FAILURE,
  REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE,
  UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAILURE,
} from '../constants/auth';

// -------- LOGIN --------
export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = user => ({
  type: LOGIN_SUCCESS,
  user,
});

export const loginFailure = error => ({
  type: LOGIN_FAILURE,
  error,
});

// -------- LOGOUT --------
export const logoutRequest = () => ({
  type: LOGOUT_REQUEST,
});

export const logoutSuccess = user => ({
  type: LOGOUT_SUCCESS,
  user,
});

export const logoutFailure = error => ({
  type: LOGOUT_FAILURE,
  error,
});

// -------- GET SESSION --------
export const getSessionRequest = () => ({
  type: GET_SESSION_REQUEST,
});

export const getSessionSuccess = user => ({
  type: GET_SESSION_SUCCESS,
  user,
});

export const getSessionFailure = error => ({
  type: GET_SESSION_FAILURE,
  error,
});

// -------- REGISTER --------
export const registerRequest = () => ({
  type: REGISTER_REQUEST,
});

export const registerSuccess = user => ({
  type: REGISTER_SUCCESS,
  user,
});

export const registerFailure = error => ({
  type: REGISTER_FAILURE,
  error,
});

// -------- UPDATE USER --------
export const updateUserRequest = () => ({
  type: UPDATE_USER_REQUEST,
});

export const updateUserSuccess = user => ({
  type: UPDATE_USER_SUCCESS,
  user,
});

export const updateUserFailure = error => ({
  type: UPDATE_USER_FAILURE,
  error,
});