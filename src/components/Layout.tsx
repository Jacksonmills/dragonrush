import styled from 'styled-components';

export default styled.div<{
  isFullLayout: boolean,
}>`
  position: relative;
  min-height: 100%;
  padding-top: ${props => (props.isFullLayout ? '72px' : '0')};
  background: hsl(0, 55%, 47%);
  background: linear-gradient(
    335deg,
    hsl(0, 45%, 47%) -10%,
    hsl(52, 100%, 49%) 110%
  );
  background-repeat: no-repeat;
  background-size: cover;
`;
