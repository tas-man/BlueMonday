import {
  CREATE_JOB_REQUEST, CREATE_JOB_SUCCESS, CREATE_JOB_FAILURE,
  READ_JOB_REQUEST, READ_JOB_SUCCESS, READ_JOB_FAILURE,
  READ_JOBS_REQUEST, READ_JOBS_SUCCESS, READ_JOBS_FAILURE,
  UPDATE_JOB_REQUEST, UPDATE_JOB_SUCCESS, UPDATE_JOB_FAILURE,
  DELETE_JOB_REQUEST, DELETE_JOB_SUCCESS, DELETE_JOB_FAILURE,
} from '../constants/jobs';

const initialState = {
  pending: false,
  jobs: [],
  currentJob: null,
  error: null,
};

export const jobs = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_JOB_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case CREATE_JOB_SUCCESS:
      return {
        ...state,
        pending: false,
        jobs: [...state.jobs, action.job.data],
        error: null,
      };
    case CREATE_JOB_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
      // -------- READ --------
    case READ_JOB_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case READ_JOB_SUCCESS:
      return {
        ...state,
        pending: false,
        currentJob: action.jobs.data,
        error: null,
      };
    case READ_JOB_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.error.response,
      };
      // -------- READ ALL --------
    case READ_JOBS_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case READ_JOBS_SUCCESS:
      return {
        ...state,
        pending: false,
        jobs: [...action.jobs.data],
        error: null,
      };
    case READ_JOBS_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.error.response,
      };
      // -------- UPDATE --------
    case UPDATE_JOB_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case UPDATE_JOB_SUCCESS:
      return {
        ...state,
        pending: false,
        currentJob: action.jobs.data,
        error: null,
      };
    case UPDATE_JOB_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.error.response,
      };
      // -------- REMOVE --------
    case DELETE_JOB_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case DELETE_JOB_SUCCESS:
      return {
        ...state,
        pending: false,
        error: null,
      };
    case DELETE_JOB_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export const getJobsPending = state => state.jobs.pending;
export const getJobs = state => state.jobs.jobs;
export const getJobsError = state => state.jobs.error;
