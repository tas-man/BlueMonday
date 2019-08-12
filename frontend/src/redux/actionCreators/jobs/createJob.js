import { axiosInstance } from '../../../api';
import {
  createJobRequest, createJobSuccess, createJobFailure,
} from '../../actions/jobs';
import logout from '../auth/logout';

export default function createJob(job, token) {
  return (dispatch) => {
    dispatch(createJobRequest());
    return axiosInstance('/jobs/create', 'POST', job, token)
      .then((res) => {
        dispatch(createJobSuccess(res));
      })
      .catch((error) => {
        dispatch(createJobFailure(error));
        if(error.message.includes("401")) dispatch(logout(token));
      });
  };
}
