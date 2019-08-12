import dimension from '../../component/style/dimension';
import styled from 'styled-components';

export const DetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
`;

export const DetailWrapper = styled.div`
  height: 35px;
  width: 100%;
  display: flex;
  flex-direction: column;
  font-size: ${dimension.fontSize};
  color: ${props => props.theme.accountDescriptor};
  padding: ${dimension.standardPadding} 0;
`;

export const Detail = styled.div`
  width: 100%;
  color: ${props => props.theme.font};
  font-size: ${dimension.fontSizeItemHeader};
  padding-top: 5px;
`;