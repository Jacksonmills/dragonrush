import React from 'react';
import styled from 'styled-components';

import { COLORS } from '@/constants';
import UnstyledButton from './UnstyledButton';

const AddStepButton = ({ children, onClick }: { children: React.ReactNode; onClick: () => void; }) => {
  return (
    <Wrapper onClick={onClick}>
      <Front>{children}</Front>
      <Shadow />
    </Wrapper>
  );
};

const Front = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${20 / 16}rem;
  font-weight: bold;
  background-color: ${COLORS.secondary};
  color: ${COLORS.white};
  border: 4px solid ${COLORS.black};
  padding: 8px 0;
`;

const Shadow = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  @media (min-width: 768px) {
    box-shadow: -8px 8px 0px 0px ${COLORS.black};
  }
`;

const Wrapper = styled(UnstyledButton)`
  position: relative;
  width: 100%;

  &:active ${Front} {
    transform: translate(-4px, 4px);
  }
`;

export default AddStepButton;