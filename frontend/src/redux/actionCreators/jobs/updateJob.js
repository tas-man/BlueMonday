import { axiosInstance } from '../../../api';
import {
  updateJobRequest, updateJobSuccess, updateJobFailure,
} from '../../actions/jobs';
import logout from '../auth/logout';

export default function updateJob(id, job, token) {
  return (dispatch) => {
    dispatch(updateJobRequest());
    return axiosInstance(`/jobs/update?id=${id}`, 'PUT', job, token)
      .then((res) => {
          dispatch(updateJobSuccess(res));
      })
      .catch((error) => {
        dispatch(updateJobFailure(error));
        if(error.message.includes("401")) dispatch(logout(token));
      });
  };
}
