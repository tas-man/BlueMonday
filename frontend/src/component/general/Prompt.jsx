import styled from 'styled-components';
import dimension from '../style/dimension';

const Prompt = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: ${dimension.halfPadding};
  margin-top: ${dimension.standardPadding};
  span {
    color: ${props => props.theme.warning};
    margin-top: ${dimension.doublePadding};
  }
`;

export default Prompt;
