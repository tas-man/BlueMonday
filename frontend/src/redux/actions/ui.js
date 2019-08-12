import {
  TOGGLE_CREATE_JOB_MODAL,
  TOGGLE_EDIT_JOB_MODAL,  
  TOGGLE_CREATE_TASK_MODAL,
  TOGGLE_EDIT_ACCOUNT_MODAL,
} from '../constants/ui';

// -------- LOGIN --------

// eslint-disable-next-line import/prefer-default-export
export const toggleCreateJobModal = () => ({
  type: TOGGLE_CREATE_JOB_MODAL,
});

export const toggleEditJobModal = () => ({
  type: TOGGLE_EDIT_JOB_MODAL,
});

export const toggleCreateTaskModal = () => ({
  type: TOGGLE_CREATE_TASK_MODAL,
});

export const toggleEditAccountModal = () => ({
  type: TOGGLE_EDIT_ACCOUNT_MODAL,
});
