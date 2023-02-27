import styled from 'styled-components';
import { COLORS, INPUTS } from '@/constants';

import InputLabel from './InputLabel';

const Medium = () => {
  return (
    <Wrapper
      style={{
        ['--darker-color' as any]: '#003115',
        ['--dark-color' as any]: '#00642a',
        ['--light-color' as any]: '#05fe0b',
      }}
    >
      <InputLabel>M</InputLabel>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  font-size: ${26 / 16}rem;
  font-weight: 500;
  text-align: center;
  color: ${COLORS.white};
  width: ${INPUTS.size / 16}rem;
  height: ${INPUTS.size / 16}rem;
  background: var(--dark-color);
  background: linear-gradient(345deg, var(--dark-color) 20%, var(--light-color) 70%);
  box-shadow: 0px 0.5px 2px 0.5px var(--dark-color), 0px -0.5px 2px 0.5px var(--light-color),
    0px 0px 0px 1px ${COLORS.black};
  border: 1px solid ${COLORS.white};
  border-radius: 50px;
`;

export default Medium;
