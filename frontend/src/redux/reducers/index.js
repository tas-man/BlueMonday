import { combineReducers } from 'redux';
import {reducer as formReducer } from 'redux-form';
import { jobs } from './jobs';
import { auth } from './auth';
import { ui } from './ui';

export default combineReducers({
  form: formReducer,
  jobs: jobs,
  auth: auth,
  ui: ui,
});
