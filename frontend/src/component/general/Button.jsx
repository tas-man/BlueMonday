import { Link } from 'react-router-dom';
import styled from 'styled-components';
import dimension from '../style/dimension';

export const NavButton = styled(Link)`
  height: 32%;
  width: 100%;
  display: flex;
  color: ${props => props.theme.fontColor};
  align-items: center;
  justify-content: center;
  text-decoration: none;
  border-radius: 10px;
  :hover {
    background: ${props => props.theme.navMenuItemHover};
    transition: 0.2s;
  }
  &:active {
    background: ${props => props.theme.navMenuItemActive};
  }
`;

export const NavLink = styled(Link)`
  width: 100%;
  color: ${props => props.theme.fontColor};
  text-decoration: none;
  &:hover {
    color: ${props => props.theme.primaryBtnHover}
  }
  &:active {
    color: ${props => props.theme.primaryBtn}
  }
`;

export const ActionButton = styled.button`
  height: ${dimension.buttonHeight};
  width: ${dimension.buttonWidth};
  background: transparent;
  color: ${props => props.theme.fontColor};
  border: none;
  padding: 0;
  font-size: ${dimension.fontSize};
  &:active {
    outline: 0;
  }
  &:focus {
    outline: 0;
  }
`;

export const NavMenuButton = styled(ActionButton)`
  height: 60px;
  width: 60px;
  display: flex;
  border-radius: 50%;
  align-content: center;
  :hover {
    background: ${props => props.theme.navMenuBtnHover};
    transition: 0.2s;
  }
`;

export const PrimaryButton = styled(ActionButton)`
  display: flex;
  border-radius: 10px;
  align-content: center;
  justify-content: center;
  background: ${props => props.theme.primaryBtn};
  :hover {
    background: ${props => props.theme.primaryBtnHover};
  }
`;

export const WidePrimaryButton = styled(PrimaryButton)`
  width: 100%;
  margin-top: ${dimension.doublePadding};
  svg {
    margin-right: ${dimension.standardPadding};
  }
  span {
    height: 24px;
    line-height: 24px;
    font-size: ${dimension.fontSizeItemHeader};
  }
`;

export const SecondaryButton = styled(ActionButton)`
  display: flex;
  border-radius: 10px;
  align-content: center;
  justify-content: center;
  background: ${props => props.theme.secondaryBtn};
  :hover {
    background: ${props => props.theme.secondaryBtnHover};
  }
`;
