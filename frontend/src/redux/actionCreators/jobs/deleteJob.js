import { axiosInstance } from '../../../api';
import {
  deleteJobRequest, deleteJobSuccess, deleteJobFailure,
} from '../../actions/jobs';
import readJobs from './readJobs';
import logout from '../auth/logout';

export default function deleteJob(id, token) {
  return (dispatch) => {
    dispatch(deleteJobRequest());
    return axiosInstance(`/jobs/remove?id=${id}`, 'DELETE', null, token)
      .then((res) => {
        if (res) {
          dispatch(deleteJobSuccess());
          dispatch(readJobs(token));
        }
      })
      .catch((error) => {
        dispatch(deleteJobFailure(error));
        if(error.message.includes("401")) dispatch(logout(token));
      });
  };
}
