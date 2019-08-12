import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FormHeader } from '../general/Header';
import {
  Form, FieldWrapper, SubmitButton, CancelButton, ButtonWrapper, renderField,
} from './Form';
import createJobAction from '../../redux/actionCreators/jobs/createJob';
import updateJobAction from '../../redux/actionCreators/jobs/updateJob';
import { createJobModalIsVisible, editJobModalIsVisible } from '../../redux/reducers/ui';
import { toggleCreateJobModal, toggleEditJobModal } from '../../redux/actions/ui';
import { getToken } from '../../redux/reducers/auth';
import { required } from './validation';

let JobForm = (props) => {
  const {
    handleSubmit,
    pristine,
    submitting,
    updateJob,
    createJob,
    toggleEditModal,
    toggleCreateModal,
    token,
    editModalIsVisible,
    createModalIsVisible,
    data,
  } = props;

  const submitForm = (formValues) => {
    const job = { ...formValues };
    if(data) {
      updateJob(job.id, job, token);
      if (editModalIsVisible) toggleEditModal();
    } else {
      createJob(job, token);
      if (createModalIsVisible) toggleCreateModal();
    }
  };

  return (
    <Form onSubmit={handleSubmit(submitForm)}>
      <FormHeader>{data ? 'Edit Job' : 'Create a job'}</FormHeader>
      <FieldWrapper>
          <Field
            name="jobTitle"
            label="Job Title"
            component={renderField}
            type="text"
            validate={required}
          />
      </FieldWrapper>
      <ButtonWrapper>
        <CancelButton onClick={() => data ? toggleEditModal() : toggleCreateModal()}>Cancel</CancelButton>
        <SubmitButton type="submit" disabled={pristine || submitting}>Create</SubmitButton>
      </ButtonWrapper>
    </Form>
  );
};

JobForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  updateJob: PropTypes.func.isRequired,
  createJob: PropTypes.func.isRequired,
  toggleEditModal: PropTypes.func.isRequired,
  toggleCreateModal: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  editModalIsVisible: PropTypes.bool.isRequired,
  createModalIsVisible: PropTypes.bool.isRequired,
  data: PropTypes.shape({}),
};

JobForm.defaultProps = {
  data: null,
}

const mapStateToProps = (state, ownProps) => ({
  token: getToken(state),
  editModalIsVisible: editJobModalIsVisible(state),
  createModalIsVisible: createJobModalIsVisible(state),
  initialValues: ownProps.data,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  updateJob: (id, job, token) => updateJobAction(id, job, token),
  createJob: (job, token) => createJobAction(job, token),
  toggleEditModal: () => toggleEditJobModal(),
  toggleCreateModal: () => toggleCreateJobModal(),
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({ form: 'jobForm', enableReinitialize: true })(JobForm));
