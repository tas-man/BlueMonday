import {
  TOGGLE_CREATE_JOB_MODAL,
  TOGGLE_EDIT_JOB_MODAL,
  TOGGLE_CREATE_TASK_MODAL,
  TOGGLE_EDIT_ACCOUNT_MODAL,
} from '../constants/ui';

const initialState = {
  showCreateJobModal: false,
  showEditJobModal: false,
  showCreateTaskModal: false,
  showEditAccountModal: false,
};

export const ui = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_CREATE_JOB_MODAL:
      return {
        ...state,
        showCreateJobModal: !state.showCreateJobModal,
      };
    case TOGGLE_EDIT_JOB_MODAL:
      return {
        ...state,
        showEditJobModal: !state.showEditJobModal,
      };
    case TOGGLE_CREATE_TASK_MODAL:
      return {
        ...state,
        showCreateTaskModal: !state.showCreateTaskModal,
      };  
    case TOGGLE_EDIT_ACCOUNT_MODAL:
      return {
        ...state,
        showEditAccountModal: !state.showEditAccountModal,
      };
    default:
      return state;
  }
};

export const createJobModalIsVisible = state => state.ui.showCreateJobModal;
export const editJobModalIsVisible = state => state.ui.showEditJobModal;
export const createTaskModalIsVisible = state => state.ui.showCreateTaskModal;
export const editAccountModalIsVisible = state => state.ui.showEditAccountModal;
