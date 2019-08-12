import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink } from '../../general/Button';
import Prompt from '../../general/Prompt';
import { ViewWrapper, ContentWrapper } from '../../general/ViewWrapper';
import { getLoginError } from '../../../redux/reducers/auth';
import LoginForm from '../../forms/LoginForm';

const Login = ({ error }) => {
  return (
    <ViewWrapper>
      <ContentWrapper>
        <LoginForm />
        <Prompt>
          <NavLink to="/register">
            Dont have an account yet?
            <br />
            Please register here for free!
          </NavLink>
          {(error && !error.includes('401')) && <span>- Unable to login, please try again! -</span>}
        </Prompt>
      </ContentWrapper>
    </ViewWrapper>
  );
};

Login.propTypes = {
  error: PropTypes.string,
};

Login.defaultProps = {
  error: null,
};

const mapStateToProps = state => ({
  error: getLoginError(state),
});

export default connect(mapStateToProps, null)(Login);
