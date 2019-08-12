import { axiosLoginRequest } from '../../../api';
import {
  loginRequest, loginSuccess, loginFailure,
} from '../../actions/auth';

export default function login(user) {
  return (dispatch) => {
    dispatch(loginRequest());
    return axiosLoginRequest(user)
      .then((res) => {
        dispatch(loginSuccess(res));
      })
      .catch((error) => {
        dispatch(loginFailure(error));
      });
  };
}
