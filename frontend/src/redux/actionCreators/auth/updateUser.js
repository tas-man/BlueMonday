import { axiosInstance } from '../../../api';
import {
  updateUserRequest, updateUserSuccess, updateUserFailure,
} from '../../actions/auth';
import logout from '../auth/logout';

export default function updateUser(id, user, token) {
  return (dispatch) => {
    dispatch(updateUserRequest());
    return axiosInstance('/users/update?id=' + id, 'PUT', user, token)
      .then((res) => {
        dispatch(updateUserSuccess(res));
      })
      .catch((error) => {
        dispatch(updateUserFailure(error));
        if(error.message.includes("401")) dispatch(logout(token));
      });
  };
}
