import styled from 'styled-components';
import dimension from '../style/dimension';

export const Header = styled.div`
  max-width: 300px;
  min-height: 30px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 600px;
  font-size: ${dimension.fontSizeHeader};
  padding: ${dimension.standardPadding};
`;

export const ItemHeader = styled(Header)`
  width: 70%;
  font-size: ${dimension.fontSizeItemHeader};
  padding: 0;
`;

export const FormHeader = styled.div`
  display: block;
  font-weight: 600px;
  font-size: ${dimension.fontSizeHeader};
  padding: ${dimension.doublePadding} 0;
`;
