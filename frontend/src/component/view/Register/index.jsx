import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink } from '../../general/Button';
import Prompt from '../../general/Prompt';
import { ViewWrapper, ContentWrapper } from '../../general/ViewWrapper';
import { getJobsError } from '../../../redux/reducers/jobs';
import RegisterForm from '../../forms/RegisterForm';

const Register = ({ error }) => {
  return (
    <ViewWrapper>
      <ContentWrapper>
        <RegisterForm />
        <Prompt>
          <NavLink to="/">
            Already have an account?
            <br />
            Please sign in here!
          </NavLink>
          {error && <span>- Unable to register, please try again! -</span>}
        </Prompt>
      </ContentWrapper>
    </ViewWrapper>
  );
};

Register.propTypes = {
  error: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  error: getJobsError(state),
});

export default connect(mapStateToProps, null)(Register);
