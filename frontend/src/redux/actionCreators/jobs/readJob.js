import { axiosInstance } from '../../../api';
import {
  readJobRequest, readJobSuccess, readJobFailure,
} from '../../actions/jobs';
import logout from '../auth/logout';

export default function readJob(id, token) {
  return (dispatch) => {
    dispatch(readJobRequest());
    return axiosInstance(`/jobs/read?id=${id}`, 'GET', null, token)
      .then((res) => {
        dispatch(readJobSuccess(res));
      })
      .catch((error) => {
        dispatch(readJobFailure(error));
        if(error.message.includes("401")) dispatch(logout(token));
      });
  };
}
