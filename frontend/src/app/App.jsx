import React from 'react';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom';
import theme from '../component/style/theme';
import Dashboard from '../component/view/Dashboard';
import Account from '../component/view/Account';
import JobView from '../component/view/JobView';
import Login from '../component/view/Login';
import Register from '../component/view/Register';
import TopBar from '../component/App/TopBar';
import BottomBar from '../component/App/BottomBar';
import dimension from '../component/style/dimension';
import { GlobalViewWrapper } from '../component/general/ViewWrapper';
import { getLoginStatus } from '../redux/reducers/auth';

const GlobalStyle = createGlobalStyle`
  html, body, #root{
    height: 100%;
    width: 100%;
    font-family: sans-serif;
    font-size: ${dimension.fontSize};
    color: ${props => props.theme.fontColor};
    background: ${props => props.theme.mainViewBgColor};
    margin: 0;
    padding: 0;
  }
`;

const AppWrapper = styled.div`
  min-height: 100%;
  min-width: 100%;
  position: relative;
`;

function App({ isLoggedIn }) {
  return (
    <ThemeProvider theme={theme.default}>
      <Router>
        <AppWrapper>
          <GlobalStyle />
          <TopBar />
          <GlobalViewWrapper>
            {isLoggedIn ? (
              <Switch>
                <Route exact path="/" component={withRouter(Dashboard)} />
                <Route exact path="/jobs/:id" component={withRouter(JobView)} />
                <Route exact path="/account" component={withRouter(Account)} />
              </Switch>
            ) : (
              <Switch>
                <Route exact path="/" component={withRouter(Login)} />
                <Route exact path="/register" component={withRouter(Register)} />
              </Switch>
            )}
          </GlobalViewWrapper>
          <BottomBar />
        </AppWrapper>
      </Router>
    </ThemeProvider>
  );
}

App.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isLoggedIn: getLoginStatus(state),
});

export default connect(mapStateToProps)(App);
