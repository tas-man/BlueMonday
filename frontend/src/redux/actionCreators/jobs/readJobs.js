import { axiosInstance } from '../../../api';
import {
  readJobsRequest, readJobsSuccess, readJobsFailure,
} from '../../actions/jobs';
import logout from '../auth/logout';

export default function readJobs(token) {
  return (dispatch) => {
    dispatch(readJobsRequest());
    return axiosInstance('/jobs/readAll', 'GET', null, token)
      .then((res) => {
        dispatch(readJobsSuccess(res));
      })
      .catch((error) => {
        dispatch(readJobsFailure(error));
        if(error.message.includes("401")) dispatch(logout(token));
      });
  };
}
