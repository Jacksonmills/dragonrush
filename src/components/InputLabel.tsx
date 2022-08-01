import styled from 'styled-components';

export default styled.span`
  position: relative;
  top: -6.5px;
  font-size: ${22 / 16}rem;
  font-weight: 400;
  filter: drop-shadow(0.75px 0.75px 0px var(--darker-color));
  text-shadow: 0px 0px 1px var(--darker-color);
  pointer-events: none;
  user-select: none;
`;