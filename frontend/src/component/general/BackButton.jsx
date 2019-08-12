import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ArrowLeftCircleIcon from 'mdi-react/ArrowLeftCircleIcon';

const BackButtonLink = styled(Link)`
  color: ${props => props.theme.fontColor};
`;

const BackButtonImg = styled(ArrowLeftCircleIcon)`
  position: absolute;
  top: 85px ;
  margin-bottom: 20px;
  path:hover {
    color: ${props => props.theme.primaryBtn};
  }
`;

export const BackButton = () => (
  <BackButtonLink to="/">
    <BackButtonImg size={32}/>
  </BackButtonLink>
);