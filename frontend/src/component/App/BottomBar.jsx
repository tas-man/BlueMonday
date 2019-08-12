import React from 'react';
import styled from 'styled-components';
import dimension from '../style/dimension';

const BottomBarWrapper = styled.div`
  height: ${dimension.bottomBarHeight};
  margin-top: -${dimension.bottomBarHeight};
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  background: ${props => props.theme.bottomBarColor};
`;

const TextWrapper = styled.div`
  height: ${props => props.height}%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  font-size: 12px;
  text-align: center;
`;

const BottomBar = () => {
  return (
    <BottomBarWrapper>
      <TextWrapper height={25} />
      <TextWrapper height={50}>
        © Copyright 2019 | Totte Sjöman
      </TextWrapper>
      <TextWrapper height={25} />
    </BottomBarWrapper>
  );
};

export default BottomBar;
