import { axiosInstance } from '../../../api';
import {
  logoutRequest, logoutSuccess, logoutFailure,
} from '../../actions/auth';

export default function logout(token) {
  return (dispatch) => {
    dispatch(logoutRequest());
    return axiosInstance('/users/logout', 'POST', {}, token)
      .then((res) => {
        dispatch(logoutSuccess(res));
        window.location.href = '/';
      })
      .catch((error) => {
        dispatch(logoutFailure(error));
        window.location.href = '/';
      });
  };
}
