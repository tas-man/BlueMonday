import React from 'react';
import styled from 'styled-components';
import colors from '../component/style/color';

const LoaderWrapper = styled.div`
  background: ${colors.turq0};
  display: block;
#loader {
    position: absolute;
    display: flex;
    min-height: 100%;
    min-width: 100%;
    background: ${colors.turq0};
    justify-content: center;
    align-items: center;
  }
  .lds-grid {
    display: inline-block;
    position: relative;
    width: 256px;
    height: 256px;
  }
  .lds-grid div {
    position: absolute;
    width: 52px;
    height: 52px;
    border-radius: 50%;
    background: #000;
    animation: lds-grid 1.2s linear infinite;
  }
  .lds-grid div:nth-child(1) {
    top: 24px;
    left: 24px;
    animation-delay: 0s;
  }
  .lds-grid div:nth-child(2) {
    top: 24px;
    left: 104px;
    animation-delay: -0.4s;
  }
  .lds-grid div:nth-child(3) {
    top: 24px;
    left: 180px;
    animation-delay: -0.8s;
  }
  .lds-grid div:nth-child(4) {
    top: 104px;
    left: 24px;
    animation-delay: -0.4s;
  }
  .lds-grid div:nth-child(5) {
    top: 104px;
    left: 104px;
    animation-delay: -0.8s;
  }
  .lds-grid div:nth-child(6) {
    top: 104px;
    left: 180px;
    animation-delay: -1.2s;
  }
  .lds-grid div:nth-child(7) {
    top: 180px;
    left: 24px;
    animation-delay: -0.8s;
  }
  .lds-grid div:nth-child(8) {
    top: 180px;
    left: 104px;
    animation-delay: -1.2s;
  }
  .lds-grid div:nth-child(9) {
    top: 180px;
    left: 180px;
    animation-delay: -1.6s;
  }
  @keyframes lds-grid {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
`;

const Loader = () => (
  <LoaderWrapper>
    <div id="loader">
      <div className="lds-grid">
        <div />
        <div />
        <div />

        <div />
        <div />
        <div />

        <div />
        <div />
        <div />
      </div>
      <link rel="stylesheet" type="text/css" href="loader.css" />      
    </div>
  </LoaderWrapper>
);

export default Loader;
