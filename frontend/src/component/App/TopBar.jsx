import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NavMenu from '../general/NavMenu';
import dimension from '../style/dimension';
import { getLoginStatus } from '../../redux/reducers/auth';

const TopBarWrapper = styled.div`
  height: ${dimension.topBarHeight};
  width: 100%;
  min-width: 350px;
  display: flex;
  flex-direction: row;
  position: fixed;
  align-items: center;
  justify-content: space-between;
  background: ${props => props.theme.topBarColor};
  z-index: 1;
  margin: 0;
`;

const LogoText = styled.div`
  height: ${dimension.topBarHeight};
  font-size: ${dimension.fontSizeLogo};
  line-height: ${dimension.topBarHeight};
  padding-left: ${dimension.standardPadding};
`;

const MenuWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  padding-right: ${dimension.doublePadding};
  @media screen and (max-width: 350px) {
    width: 40%;
  };
`;

const TopBar = ({ isLoggedIn }) => (
  <TopBarWrapper>
    <LogoText>
      BlueMonday
    </LogoText>
    <MenuWrapper>
      {isLoggedIn && <NavMenu /> }
    </MenuWrapper>
  </TopBarWrapper>
);

TopBar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isLoggedIn: getLoginStatus(state),
});

export default connect(mapStateToProps)(TopBar);
