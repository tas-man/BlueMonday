import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import DotsVerticalIcon from 'mdi-react/DotsVerticalIcon';
import { NavButton, NavMenuButton } from './Button';
import { Divider } from '../forms/Form';
import { getToken } from '../../redux/reducers/auth';
import logoutAction from '../../redux/actionCreators/auth/logout';
import dimension from '../style/dimension';

const MenuWrapper = styled.div`
  display: block;
`;

const DotsIcon = styled(DotsVerticalIcon)`
  min-height: 35px;
  min-width: 35px;
  display: block;
  margin: auto;
`;

const DropdownItems = styled.div`
  height: 220px;
  width: 200px;
  display: flex;
  background: transparent;
  position: absolute;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background: ${props => props.theme.topBarColor};
  border-radius: 10px;
  padding: ${dimension.halfPadding};
  top: calc(${dimension.topBarHeight} + 5px);
  right: 5px;
`;

const DropDownDivider = styled(Divider)`
  width: 80%;
  border-color: ${props => props.theme.dropdownDivider};
  margin: ${dimension.halfPadding} 0;
`;

const NavMenu = ({ token, logout }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = (e) => {
    const navMenu = document.getElementById('nav-menu');
    if (navMenu && navMenu.contains(e.target)) {
      return;
    }
    document.removeEventListener('mousedown', handleClick, false);
    setIsVisible(false);
  };

  const toggleMenuVisibility = () => {
    if (isVisible) {
      document.removeEventListener('mousedown', handleClick, false);
      return setIsVisible(false);
    }
    document.addEventListener('mousedown', handleClick, false);
    return setIsVisible(true);
  };

  return (
    <MenuWrapper id="nav-menu">
      <NavMenuButton onClick={() => toggleMenuVisibility()}>
        <DotsIcon />
      </NavMenuButton>
      {
        isVisible
        && (
        <DropdownItems id="nav-dropdown-menu" onClick={() => toggleMenuVisibility()}>
          <NavButton to="/">Dashboard</NavButton>
          <DropDownDivider />
          <NavButton to="/account">Account</NavButton>
          <DropDownDivider />
          <NavButton to="/" onClick={() => logout(token)}>Sign Out</NavButton>
        </DropdownItems>
        )
      }
    </MenuWrapper>
  );
};

NavMenu.propTypes = {
  token: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  token: getToken(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  logout: token => logoutAction(token),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NavMenu);
