import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FormHeader } from '../general/Header';
import {
  Form,
  FieldWrapper,
  SubmitButton,
  CancelButton,
  ButtonWrapper,
  renderField,
} from './Form';
import updateJobAction from '../../redux/actionCreators/jobs/updateJob';
import { createTaskModalIsVisible } from '../../redux/reducers/ui';
import { toggleCreateTaskModal } from '../../redux/actions/ui';
import { getToken } from '../../redux/reducers/auth';
import { required } from './validation';

let TaskForm = (props) => {
  const {
    handleSubmit,
    pristine,
    submitting,
    updateJob,
    toggleModal,
    token,
    modalIsVisible,
    data,
  } = props;

  const submitForm = (formValues) => {
    const updatedJob = data;
    const newTask = { ...formValues, completed: false };
    if (updatedJob && updatedJob.bindActionCreatorstasks) {
      updatedJob.bindActionCreatorstasks.push(newTask);
      updateJob(data.id, updatedJob, token);
    }
    if (modalIsVisible) toggleModal();
  };

  return (
    <Form onSubmit={handleSubmit(submitForm)}>
      <FormHeader>Create a task</FormHeader>
      <FieldWrapper>
        <Field
          name='description'
          label='Task Description'
          component={renderField}
          type='text'
          validate={required}
        />
      </FieldWrapper>
      <ButtonWrapper>
        <CancelButton onClick={() => toggleModal()}>Cancel</CancelButton>
        <SubmitButton type='submit' disabled={pristine || submitting}>
          Create
        </SubmitButton>
      </ButtonWrapper>
    </Form>
  );
};

TaskForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  updateJob: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  modalIsVisible: PropTypes.bool.isRequired,
  data: PropTypes.shape({}).isRequired,
};

const mapStateToProps = (state) => ({
  token: getToken(state),
  modalIsVisible: createTaskModalIsVisible(state),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updateJob: (id, job, token) => updateJobAction(id, job, token),
      toggleModal: () => toggleCreateTaskModal(),
    },
    dispatch
  );

TaskForm = connect(mapStateToProps, mapDispatchToProps)(TaskForm);

const formConfig = {
  form: 'taskForm',
};

export default reduxForm(formConfig)(TaskForm);
