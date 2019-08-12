import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import registerAction from '../../redux/actionCreators/auth/register';
import { FormHeader } from '../general/Header';
import { WidePrimaryButton } from '../general/Button';
import {
  Form, FieldWrapper, renderField,
} from './Form';
import { required, minLength10, email } from './validation';

let RegisterForm = (props) => {
  const {
    handleSubmit,
    pristine,
    submitting,
    register,
  } = props;

  const submitForm = (formValues) => {
    register(formValues);
  };

  return (
    <Form onSubmit={handleSubmit(submitForm)}>
      <FormHeader>Register</FormHeader>
      <FieldWrapper>
        <Field
          name="firstName"
          label="First Name"
          component={renderField}
          type="text"
          validate={required}
        />
      </FieldWrapper>
      <FieldWrapper>
        <Field
          name="lastName"
          label="Last Name"
          component={renderField}
          type="text"
          validate={required}
        />
      </FieldWrapper>
      <FieldWrapper>
        <Field
          name="email"
          label="Email"
          component={renderField}
          type="text"
          validate={[required, email]}
        />
      </FieldWrapper>
      <FieldWrapper>
        <Field
          name="username"
          label="Username"
          component={renderField}
          type="text"
          validate={required}
        />
      </FieldWrapper>
      <FieldWrapper>
        <Field
          name="password"
          label="Password"
          component={renderField}
          type="password"
          validate={[required, minLength10]}
        />
      </FieldWrapper>
      <FieldWrapper>
        <WidePrimaryButton type="submit" disabled={pristine || submitting}>
          Register
        </WidePrimaryButton>
      </FieldWrapper>
    </Form>
  );
};

RegisterForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  register: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators({
  register: user => registerAction(user),
}, dispatch);

RegisterForm = connect(null, mapDispatchToProps)(RegisterForm);

const formConfig = {
  form: 'registerForm',
};

export default reduxForm(formConfig)(RegisterForm);
