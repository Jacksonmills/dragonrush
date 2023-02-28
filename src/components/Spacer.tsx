import styled from 'styled-components';

export default styled.div<{
  axis: string;
  size: number;
}>`
  /* flex-direction: ${props => props.axis === 'vertical' ? 'column' : 'row'}; */
  height: ${props => props.axis === 'vertical' ? `${props.size}px` : 'auto'};
  width: ${props => props.axis === 'horizontal' ? `${props.size}px` : 'auto'};
`;