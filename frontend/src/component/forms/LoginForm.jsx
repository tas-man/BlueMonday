import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import loginAction from '../../redux/actionCreators/auth/login';
import { FormHeader } from '../general/Header';
import { WidePrimaryButton } from '../general/Button';
import {
  Form, FieldWrapper, renderField,
} from './Form';
import { required, minLength10 } from './validation';

let LoginForm = (props) => {
  const {
    handleSubmit,
    pristine,
    submitting,
    login,
  } = props;

  const submitForm = (formValues) => {
    login(formValues);
  };

  return (
    <Form onSubmit={handleSubmit(submitForm)}>
      <FormHeader>Sign In</FormHeader>
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
          Sign In
        </WidePrimaryButton>
      </FieldWrapper>
    </Form>
  );
};

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators({
  login: user => loginAction(user),
}, dispatch);

LoginForm = connect(null, mapDispatchToProps)(LoginForm);

const formConfig = {
  form: 'loginForm',
};

export default reduxForm(formConfig)(LoginForm);
