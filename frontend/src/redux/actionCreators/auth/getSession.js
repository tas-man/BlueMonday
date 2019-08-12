import { axiosInstance } from '../../../api';
import {
  getSessionRequest, getSessionSuccess, getSessionFailure,
} from '../../actions/auth';
import logout from '../auth/logout';

export default function getSession(token) {
  return (dispatch) => {
    dispatch(getSessionRequest());
    return axiosInstance('/users/current', 'GET', null, token)
      .then((res) => {
        dispatch(getSessionSuccess(res));
      })
      .catch((error) => {
        dispatch(getSessionFailure(error));
        if(error.message.includes("401")) dispatch(logout(token));
      });
  };
}
