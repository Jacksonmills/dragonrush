import styled from 'styled-components';
import { COLORS, ATTACKS } from '@/constants';

import InputLabel from './InputLabel';

const DragonRush = () => {
  return (
    <Wrapper tabIndex={0}>
      <Theme
        style={{
          ['--darker-color' as any]: '#00362f',
          ['--dark-color' as any]: '#0a6858',
          ['--light-color' as any]: '#daff61',
        }}
      >
        <InputLabel>DR</InputLabel>
      </Theme>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: inline-block;
  padding: 5px;
  width: 46px;
  height: 46px;
  z-index: 2;
`;

const Theme = styled.div`
  position: relative;
  top: 2px;
  left: 2px;
  font-size: ${26 / 16}rem;
  font-weight: 500;
  text-align: center;
  color: ${COLORS.white};
  width: ${ATTACKS.size};
  height: ${ATTACKS.size};
  background: var(--dark-color);
  background: linear-gradient(
    345deg,
    var(--dark-color) 20%,
    var(--light-color) 70%
  );
  border: 0.5px solid ${COLORS.offblack};
  box-shadow: 0 0 0 1.25px #e0e0e0, 0 0 0 2px ${COLORS.offblack},
    inset 0 0 0px 0.8px var(--dark-color),
    inset 0 0 1px 1.2px var(--light-color);
  border-radius: 50px;
`;

export default DragonRush;
