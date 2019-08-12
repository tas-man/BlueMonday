import { axiosRegisterRequest } from '../../../api';
import {
  registerRequest, registerSuccess, registerFailure,
} from '../../actions/auth';

export default function register(user) {
  return (dispatch) => {
    dispatch(registerRequest());
    return axiosRegisterRequest(user)
      .then((res) => {
        dispatch(registerSuccess(res));
        window.location = '/';
      })
      .catch((error) => {
        dispatch(registerFailure(error));
      });
  };
}
