import {
  CREATE_JOB_REQUEST, CREATE_JOB_SUCCESS, CREATE_JOB_FAILURE,
  READ_JOB_REQUEST, READ_JOB_SUCCESS, READ_JOB_FAILURE,
  READ_JOBS_REQUEST, READ_JOBS_SUCCESS, READ_JOBS_FAILURE,
  UPDATE_JOB_REQUEST, UPDATE_JOB_SUCCESS, UPDATE_JOB_FAILURE,
  DELETE_JOB_REQUEST, DELETE_JOB_SUCCESS, DELETE_JOB_FAILURE,
} from '../constants/jobs';

// -------- CREATE --------

export const createJobRequest = () => ({
  type: CREATE_JOB_REQUEST,
});

export const createJobSuccess = job => ({
  type: CREATE_JOB_SUCCESS,
  job,
});

export const createJobFailure = error => ({
  type: CREATE_JOB_FAILURE,
  error,
});

// -------- READ --------

export const readJobRequest = () => ({
  type: READ_JOB_REQUEST,
});

export const readJobSuccess = jobs => ({
  type: READ_JOB_SUCCESS,
  jobs,
});

export const readJobFailure = error => ({
  type: READ_JOB_FAILURE,
  error,
});

// -------- READ ALL --------

export const readJobsRequest = () => ({
  type: READ_JOBS_REQUEST,
});

export const readJobsSuccess = jobs => ({
  type: READ_JOBS_SUCCESS,
  jobs,
});

export const readJobsFailure = error => ({
  type: READ_JOBS_FAILURE,
  error,
});

// -------- UPDATE --------

export const updateJobRequest = () => ({
  type: UPDATE_JOB_REQUEST,
});

export const updateJobSuccess = jobs => ({
  type: UPDATE_JOB_SUCCESS,
  jobs,
});

export const updateJobFailure = error => ({
  type: UPDATE_JOB_FAILURE,
  error,
});


// -------- REMOVE --------

export const deleteJobRequest = () => ({
  type: DELETE_JOB_REQUEST,
});

export const deleteJobSuccess = index => ({
  type: DELETE_JOB_SUCCESS,
  index,
});

export const deleteJobFailure = error => ({
  type: DELETE_JOB_FAILURE,
  error,
});
