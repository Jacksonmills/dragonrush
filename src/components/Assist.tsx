import styled from 'styled-components';
import { COLORS, ATTACKS } from '@/constants';

import InputLabel from './InputLabel';

const Assist = ({ assist }: { assist: number; }) => {
  return (
    <Wrapper
      style={{
        ['--darker-color' as any]: '#4d1100',
        ['--dark-color' as any]: '#f83400',
        ['--light-color' as any]: '#f8b211',
      }}
    >
      <InputLabel>A{assist === 1 ? '1' : '2'}</InputLabel>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  font-weight: 500;
  text-align: center;
  color: ${COLORS.white};
  width: ${ATTACKS.size};
  height: ${ATTACKS.size};
  background: var(--dark-color);
  background: linear-gradient(345deg, var(--dark-color) 20%, var(--light-color) 70%);
  box-shadow: 0px 0.5px 2px 0.5px var(--dark-color), 0px -0.5px 2px 0.5px var(--light-color),
    0px 0px 0px 1px ${COLORS.black};
  border: 1px solid ${COLORS.white};
  border-radius: 50px;
`;

export default Assist;
