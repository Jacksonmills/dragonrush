import styled from 'styled-components';
import { COLORS, INPUTS } from '@/constants';

import InputLabel from './InputLabel';

const SuperDash = () => {
  return (
    <Wrapper>
      <Theme
        style={{
          ['--darker-color' as any]: '#461a43',
          ['--dark-color' as any]: '#88298b',
          ['--light-color' as any]: '#ec828a',
        }}
      >
        <InputLabel>SD</InputLabel>
      </Theme>
    </Wrapper>
  );
};

const Wrapper = styled.div.attrs((props) => ({
  type: 'button',
  tabIndex: '0',
}))`
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
  width: ${INPUTS.size};
  height: ${INPUTS.size};
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

export default SuperDash;
