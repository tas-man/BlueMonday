import styled from 'styled-components';
import dimension from '../style/dimension';

export const GlobalViewWrapper = styled.div`
  min-height: 600px;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
  padding: 80px 0 ${dimension.bottomBarHeight} 0;
`;

export const ViewWrapper = styled.div`
  max-width: 400px;
  display: flex;
  flex-direction: column;
  padding: ${dimension.contentPadding};
  margin: 50px auto !important;
`;

export const ContentWrapper = styled.div`
  width: 300px;
  display: block;
  padding: ${dimension.standardPadding};
`;
