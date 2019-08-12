import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import updateUserAction from '../../redux/actionCreators/auth/updateUser';
import { FormHeader } from '../general/Header';
import {
  Form, FieldWrapper, CancelButton, SubmitButton, ButtonWrapper, renderField,
} from './Form';
import { getToken, getSessionUser } from '../../redux/reducers/auth';
import { required, minLength10, email } from './validation';
import { toggleEditAccountModal } from '../../redux/actions/ui';
import { editAccountModalIsVisible } from '../../redux/reducers/ui';

const AccountForm = (props) => {
  const {
    handleSubmit,
    pristine,
    submitting,
    updateUser,
    token,
    sessionUser,
    modalIsVisible,
    toggleModal,
  } = props;
  const [changingPassword, setChangingPassword] = useState(false);
  
  const handlePasswordInput = (e, value) => {
    if (value !== '') {
      setChangingPassword(true);
    } else {
      setChangingPassword(false);
    }
  };

  const submitForm = (formValues) => {
    updateUser(sessionUser.id, formValues, token);
    if (modalIsVisible) toggleModal();
  };

  return (
    <Form onSubmit={handleSubmit(submitForm)}>
      <FormHeader>User Details</FormHeader>
      <FieldWrapper>
        <Field
          name="firstName"
          label="First Name"
          component={renderField}
          type="text"
        />
      </FieldWrapper>
      <FieldWrapper>
        <Field
          name="lastName"
          label="Last Name"
          component={renderField}
          type="text"
        />
      </FieldWrapper>
      <FieldWrapper>
        <Field
          name="email"
          label="Email"
          component={renderField}
          type="text"
          validate={email}
        />
      </FieldWrapper>
      <FieldWrapper>
        <Field
          name="username"
          label="Username"
          component={renderField}
          type="text"
        />
      </FieldWrapper>
      <FieldWrapper>
        <Field
          name="password"
          label="Password"
          component={renderField}
          type="password"
          validate={minLength10}
          onChange={(e, value) => handlePasswordInput(e, value)}
        />
      </FieldWrapper>
      {changingPassword && (
        <FieldWrapper>
          <Field
            name="confirmPassword"
            label="Confirm Password"
            component={renderField}
            type="password"
            validate={[required, minLength10]}
          />
        </FieldWrapper>
      )}
      <ButtonWrapper>
        <CancelButton onClick={() => toggleModal()}>Cancel</CancelButton>
        <SubmitButton type="submit" disabled={pristine || submitting}>Update</SubmitButton>
      </ButtonWrapper>
    </Form>
  );
};

AccountForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  updateUser: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  sessionUser: PropTypes.shape({}).isRequired,
  modalIsVisible: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  token: getToken(state),
  sessionUser: getSessionUser(state),
  modalIsVisible: editAccountModalIsVisible(state),
  initialValues: state.auth.sessionUser,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  updateUser: (id, user, token) => updateUserAction(id, user, token),
  toggleModal: () => toggleEditAccountModal(),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({ form: 'accountForm', enableReinitialize: true })(AccountForm));
