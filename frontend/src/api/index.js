import axios from 'axios';

const BASE_URL = 'http://localhost:4000/api';

// Axios config - All authenticated requests
export const axiosInstance = (path, verb, payload, token) => axios({
  url: BASE_URL + path,
  method: verb,
  headers: {
    Authorization: 'Bearer ' + token,
    ContentType: 'application/json',
  },
  data: payload,
});

// Public endpoint requests
export const axiosRegisterRequest = payload => axios({
  url: BASE_URL + '/users/register',
  method: 'post',
  headers: {
    ContentType: 'application/json',
  },
  data: payload,
});

export const axiosLoginRequest = payload => axios({
  url: BASE_URL + '/users/authenticate',
  method: 'post',
  headers: {
    ContentType: 'application/json',
  },
  data: payload,
});
